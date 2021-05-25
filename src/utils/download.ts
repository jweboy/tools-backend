export const downloadFile = (blobData: Blob, fileName: string = 'test') => {
  const blob = new Blob([blobData], { type: blobData.type });
  const link = document.createElement('a');
  const href = window.URL.createObjectURL(blob); // 创建下载的链接
  link.href = href;
  link.download = decodeURIComponent(fileName!);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
};
