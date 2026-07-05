const items = [
  { icon: 'fa-code', label: 'Web Development' },
  { icon: 'fa-mobile-screen', label: 'Mobile Apps' },
  { icon: 'fa-bolt', label: 'Automation' },
  { icon: 'fa-palette', label: 'Brand Design' },
  { icon: 'fa-film', label: 'Video Production' },
  { icon: 'fa-pen-nib', label: 'Content Strategy' },
  { icon: 'fa-rocket', label: 'Product Launch' },
  { icon: 'fa-shield-halved', label: 'Secure Builds' },
];

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="tt">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="ti">
            <i className={`fa-solid ${item.icon}`}></i>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
