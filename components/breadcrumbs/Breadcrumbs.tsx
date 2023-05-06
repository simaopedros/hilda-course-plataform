// components/breadcrumbs/Breadcrumbs.tsx

import React from 'react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
<nav className="py-4">
  <ol className="list-none p-0 inline-flex">
    {items.map((item, index) => (
      <li key={index} className="flex items-center">
        {item.href ? (
          <a href={item.href} className="btn btn-sm btn-ghost">
            {item.label}
          </a>
        ) : (
          <span className="text-gray-500">{item.label}</span>
        )}
        {index < items.length - 1 && (
          <svg className="fill-current text-gray-500 mx-2" width="24" height="24" viewBox="0 0 24 24">
            <path d="M9.219 16.219l1.414 1.414 6-6-6-6-1.414 1.414 4.586 4.586z"></path>
          </svg>
        )}
      </li>
    ))}
  </ol>
</nav>

  );
};

export default Breadcrumbs;
