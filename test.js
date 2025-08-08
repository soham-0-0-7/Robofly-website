// robofly-website/
// ├── .env.local                                    ✅ (Already exists - Updated)
// ├── src/
// │   ├── utils/
// │   │   ├── otpUtils.ts                          🆕 (Create new)
// │   │   ├── emailService.ts                     🆕 (Create new)
// │   │   └── variables.ts                        ✅ (Already exists)
// │   │
// │   ├── components/
// │   │   ├── common/
// │   │   │   ├── OTPModal.tsx                    🆕 (Create new)
// │   │   │   └── ReCaptcha.tsx                   ✅ (Already exists)
// │   │   │
// │   │   └── contact/forms/
// │   │       ├── GeneralForm.tsx                 🔄 (Update existing)
// │   │       ├── CareerForm.tsx                  🔄 (Update existing)
// │   │       └── serviceForms/
// │   │           ├── FirstServiceForm.tsx        🔄 (Update existing)
// │   │           ├── SecondServiceForm.tsx       🔄 (Update existing)
// │   │           ├── ThirdServiceForm.tsx        🔄 (Update existing)
// │   │           ├── FourthServiceForm.tsx       🔄 (Update existing)
// │   │           ├── FifthServiceForm.tsx        🔄 (Update existing)
// │   │           ├── SixthServiceForm.tsx        🔄 (Update existing)
// │   │           └── GenForm.tsx                 🔄 (Update existing)
// │   │
// │   └── app/
// │       └── api/
// │           ├── send-otp/
// │           │   └── route.ts                    🆕 (Create new)
// │           ├── verify-otp/
// │           │   └── route.ts                    🆕 (Create new)
// │           ├── verify-captcha/
// │           │   └── route.ts                    ✅ (Already exists)
// │           └── query/
// │               ├── general/
// │               │   └── route.ts                🔄 (Update existing - Remove CAPTCHA verification)
// │               ├── career/
// │               │   └── route.ts                🔄 (Update existing - Remove CAPTCHA verification)
// │               ├── products/
// │               │   ├── first/route.ts          🔄 (Update existing - Remove CAPTCHA verification)
// │               │   ├── second/route.ts         🔄 (Update existing - Remove CAPTCHA verification)
// │               │   ├── third/route.ts          🔄 (Update existing - Remove CAPTCHA verification)
// │               │   ├── fourth/route.ts         🔄 (Update existing - Remove CAPTCHA verification)
// │               │   ├── fifth/route.ts          🔄 (Update existing - Remove CAPTCHA verification)
// │               │   ├── sixth/route.ts          🔄 (Update existing - Remove CAPTCHA verification)
// │               │   └── gen/route.ts            🔄 (Update existing - Remove CAPTCHA verification)
// │               └── services/
// │                   ├── first/route.ts          🔄 (Update existing - Remove CAPTCHA verification)
// │                   ├── second/route.ts         🔄 (Update existing - Remove CAPTCHA verification)
// │                   ├── third/route.ts          🔄 (Update existing - Remove CAPTCHA verification)
// │                   ├── fourth/route.ts         🔄 (Update existing - Remove CAPTCHA verification)
// │                   ├── fifth/route.ts          🔄 (Update existing - Remove CAPTCHA verification)
// │                   ├── sixth/route.ts          🔄 (Update existing - Remove CAPTCHA verification)
// │                   └── gen/route.ts            🔄 (Update existing - Remove CAPTCHA verification)