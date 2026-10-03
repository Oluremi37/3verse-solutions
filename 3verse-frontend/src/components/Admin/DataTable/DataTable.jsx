import "./DataTable.css";

export default function DataTable({
  columns,
  data,
  loading = false,
  emptyMessage = "No records found.",
  renderActions,
}) {
  if (loading) {
    return (
      <div className="datatable-loading">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="datatable-wrapper">
      <table className="datatable">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}

            {renderActions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="empty-row"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row._id}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}

                {renderActions && (
                  <td className="datatable-actions">{renderActions(row)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
