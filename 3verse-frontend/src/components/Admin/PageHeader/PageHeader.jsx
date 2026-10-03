import "./PageHeader.css";

export default function PageHeader({
  title,
  search = "",
  onSearch,
  searchPlaceholder = "Search...",
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="page-header">
      <div className="page-header-left">
        <h1>{title}</h1>
      </div>

      <div className="page-header-right">
        {onSearch && (
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        )}

        {buttonText && <button onClick={onButtonClick}>{buttonText}</button>}
      </div>
    </div>
  );
}
