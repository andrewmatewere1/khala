export default function Logo({ className = "h-9 w-9" }) {
    return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
            <rect width="48" height="48" rx="11" fill="#1B3B2B" />
            <path d="M24 11.5 L13 33.5 L35 33.5 Z" stroke="#FBF9F5" strokeOpacity="0.5" strokeWidth="1.4" fill="none" />
            <circle cx="24" cy="11.5" r="4" fill="#C85A32" />
            <circle cx="13" cy="33.5" r="3.6" fill="#FBF9F5" />
            <circle cx="35" cy="33.5" r="3.6" fill="#D99B26" />
            <circle cx="24" cy="26" r="2.6" fill="#FBF9F5" />
            <path d="M18.5 20 a7.5 7.5 0 0 1 11 0" stroke="#D99B26" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.9" />
        </svg>
    );
}
