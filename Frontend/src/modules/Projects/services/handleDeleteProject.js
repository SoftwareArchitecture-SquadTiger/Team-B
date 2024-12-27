export const handleDeleteProject = async (url, id) => {
  const response = await fetch(`${url}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete project");
  }
  return response.json();
};