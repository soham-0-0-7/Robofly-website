import Image from "next/image";
import Link from "next/link";
import blogData from "@/utils/blogs.json";

interface BlogPost {
  id: number;
  title: string;
  image: string;
  bodyContent: string;
}

const convertGoogleDriveUrl = (shareUrl: string): string => {
  const fileId = shareUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  return fileId
    ? `https://drive.google.com/uc?export=view&id=${fileId}`
    : shareUrl;
};

export default function BlogPage() {
  const blogs: BlogPost[] = blogData;
  const featuredBlog = blogs.find((blog) => blog.id === 1);
  const otherBlogs = blogs.filter((blog) => blog.id !== 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 text-center animate-bounce-in">
            Our <span className="text-green-600 animate-pulse">Blog</span>
          </h1>
          <p className="text-gray-600 text-center mt-4 max-w-3xl mx-auto text-lg lg:text-xl animate-slide-in-up">
            Discover insights, innovations, and stories from the world of drone
            technology and environmental protection.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Blog (ID: 1) */}
        {featuredBlog && (
          <div className="mb-16 animate-fade-in-up">
            <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 hover:scale-[1.02] group">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={convertGoogleDriveUrl(featuredBlog.image)}
                    alt={featuredBlog.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-8 lg:p-12 text-white flex flex-col justify-center">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight group-hover:text-green-100 transition-colors duration-300">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-green-100 mb-6 text-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    Discover the vision and mission that drives Robofly
                    Technology forward.
                  </p>
                  <Link
                    href={`/blog/${featuredBlog.id}`}
                    className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 w-fit hover:shadow-lg hover:px-8 group/button"
                  >
                    Read Full Story
                    <svg
                      className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/button:translate-x-1"
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
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Blogs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherBlogs.map((blog, index) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-down"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={convertGoogleDriveUrl(blog.image)}
                  alt={blog.title}
                  width={600}
                  height={450}
                  className="w-full h-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 relative">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                  {blog.title}
                </h3>
                <div className="flex items-center text-green-600 font-medium">
                  <span className="group-hover:mr-2 transition-all duration-200">
                    Read More
                  </span>
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-200"
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

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 text-center hover:from-green-100 hover:to-green-200 transition-all duration-500 animate-slide-in-up group">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-800 transition-colors duration-300">
            Ready to Transform Your Operations?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto group-hover:text-gray-700 transition-colors duration-300">
            Discover how Robofly&apos;s innovative drone solutions can
            revolutionize your industry. Let&apos;s discuss your specific needs
            and build the perfect solution together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:shadow-lg hover:px-10 group/cta"
          >
            Get in Touch
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
        </div>
      </div>
    </div>
  );
}
