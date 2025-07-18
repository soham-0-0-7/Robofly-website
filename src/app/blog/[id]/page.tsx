import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import blogData from "@/utils/blogs.json";

interface BlogPost {
  id: number;
  title: string;
  image: string;
  bodyContent: string;
}

interface BlogPageProps {
  params: {
    id: string;
  };
}

const convertGoogleDriveUrl = (shareUrl: string): string => {
  const fileId = shareUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  return fileId
    ? `https://drive.google.com/uc?export=view&id=${fileId}`
    : shareUrl;
};

// Helper function to strip HTML tags and extract plain text
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ");
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const blogs: BlogPost[] = blogData;
  const blogId = parseInt(params.id);
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    notFound();
  }

  const otherBlogs = blogs.filter((b) => b.id !== blogId).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 overflow-hidden pb-12 pt-6">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-white mb-6 animate-fade-in-up">
            <nav className="flex items-center space-x-2 text-green-100 mb-4 animate-slide-in-left">
              <Link
                href="/"
                className="hover:text-white transition-colors duration-200 hover:underline"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-white transition-colors duration-200 hover:underline"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-white">Article</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 animate-bounce-in">
              {blog.title}
            </h1>
            <div className="flex items-center space-x-4 text-green-100 animate-fade-in-delayed">
              <span>By Robofly Technology</span>
              <span>•</span>
              <span>Technology & Innovation</span>
            </div>
          </div>
          <div className="relative z-0 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-scale-in group">
            <Image
              src={convertGoogleDriveUrl(blog.image)}
              alt={blog.title}
              width={1200}
              height={800}
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 animate-fade-in-up group">
          <div className="p-8 lg:p-12">
            <div
              className="prose prose-lg max-w-none transition-all duration-300 group-hover:prose-headings:text-green-700"
              dangerouslySetInnerHTML={{ __html: blog.bodyContent }}
              style={
                {
                  "--tw-prose-body": "#374151",
                  "--tw-prose-headings": "#111827",
                  "--tw-prose-bold": "#059669",
                  "--tw-prose-links": "#059669",
                } as React.CSSProperties
              }
            />
          </div>
        </div>

        {/* Connect With Us */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 lg:p-12 text-white hover:from-green-700 hover:to-green-900 transition-all duration-500 animate-slide-in-up group">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4 group-hover:text-green-100 transition-colors duration-300">
              Ready to Take Your Project to New Heights?
            </h3>
            <p className="text-green-100 mb-8 text-lg max-w-2xl mx-auto group-hover:text-white transition-colors duration-300">
              Whether you&apos;re looking to implement drone solutions for
              agriculture, firefighting, defense, or custom applications, our
              team is here to help you achieve your goals with cutting-edge
              technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-lg hover:shadow-lg hover:px-10 group/cta"
              >
                Connect With Us
                <svg
                  className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </Link>
              {/* <div className="flex items-center space-x-4 text-green-100">
                <span>or call us at</span>
                <a
                  href="tel:+1234567890"
                  className="text-white font-semibold hover:underline"
                >
                  +91 XXX XXX XXXX
                </a>
              </div> */}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {otherBlogs.length > 0 && (
          <div className="mt-16 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center animate-bounce-in">
              More from Our Blog
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {otherBlogs.map((relatedBlog, index) => (
                <Link
                  key={relatedBlog.id}
                  href={`/blog/${relatedBlog.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-stagger"
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={convertGoogleDriveUrl(relatedBlog.image)}
                      alt={relatedBlog.title}
                      width={500}
                      height={350}
                      className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 relative">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                      {relatedBlog.title}
                    </h4>
                    <div className="flex items-center">
                      <span className="text-green-600 text-sm font-medium group-hover:mr-2 transition-all duration-200">
                        Read More
                      </span>
                      <svg
                        className="w-4 h-4 text-green-600 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-green-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Generate static params
export async function generateStaticParams() {
  const blogs: BlogPost[] = blogData;

  return blogs.map((blog) => ({
    id: blog.id.toString(),
  }));
}

// Metadata for SEO
export async function generateMetadata({ params }: BlogPageProps) {
  const blogs: BlogPost[] = blogData;
  const blogId = parseInt(params.id);
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  const description = stripHtml(blog.bodyContent).slice(0, 160) + "...";

  return {
    title: `${blog.title} | Robofly Technology`,
    description,
    openGraph: {
      title: blog.title,
      description,
      images: [blog.image],
    },
  };
}
