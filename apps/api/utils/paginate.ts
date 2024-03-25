const paginate = (items: any[], pageSize: number, pageNumber: number) => {
  const totalPages = Math.ceil(items.length / pageSize);
  const currentPage = Math.min(pageNumber, totalPages);

  if (currentPage < 1) {
    return {
      currentPage: 1,
      totalPages: totalPages,
      pageSize: pageSize,
      items: items.slice(0, Math.min(pageSize, items.length)),
    };
  }

  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, items.length);

  return {
    currentPage,
    totalPages,
    items: items.slice(startIndex, endIndex),
  };
};

export default paginate;
