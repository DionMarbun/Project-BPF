export default function PageHeader({ title, breadcrumb, children }) {
  const renderBreadcrumb = () => {
    if (!breadcrumb) return null;

    if (typeof breadcrumb === 'string') {
      return (
        <div className="flex items-center font-medium space-x-2 mt-2">
          <span className="text-gray-500">{breadcrumb}</span>
        </div>
      );
    }

    if (Array.isArray(breadcrumb)) {
      return (
        <div className="flex items-center font-medium space-x-2 mt-2">
          {breadcrumb.map((item, index) => (
            <span key={index} className="text-gray-500 flex items-center">
              {item}
              {index < breadcrumb.length - 1 && <span className="mx-2">/</span>}
            </span>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      id="pageheader-container"
      className="flex items-center justify-between p-4 pt-6"
    >
      <div id="pageheader-left" className="flex flex-col">
        <span id="page-title" className="text-3xl font-semibold">
          {title}
        </span>
        {renderBreadcrumb()}
      </div>
      <div id="action-button">{children}</div>
    </div>
  );
}
