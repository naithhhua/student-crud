function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    let clean = envUrl.trim().replace(/\/+$/, '');
    if (!clean.endsWith('/nonog/students')) {
      clean = `${clean}/nonog/students`;
    }
    return clean;
  }
  // Default to relative path handled by Vite dev server proxy locally
  return '/nonog/students';
}

/**
 * Fetch all students
 */
export async function getAllStudents() {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch students (HTTP ${response.status})`);
  }
  return response.json();
}

/**
 * Fetch a single student by ID
 */
export async function getStudentById(id) {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch student with ID ${id} (HTTP ${response.status})`);
  }
  return response.json();
}

/**
 * Create a new student
 */
export async function createStudent(studentData) {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: studentData.firstname?.trim(),
      lastname: studentData.lastname?.trim(),
      course: studentData.course?.trim(),
      section: studentData.section?.trim(),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to create student (HTTP ${response.status})`);
  }
  return response.json();
}

/**
 * Update an existing student
 */
export async function updateStudent(id, studentData) {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: studentData.firstname?.trim(),
      lastname: studentData.lastname?.trim(),
      course: studentData.course?.trim(),
      section: studentData.section?.trim(),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to update student (HTTP ${response.status})`);
  }
  return response.json();
}

/**
 * Delete a student by ID
 */
export async function deleteStudent(id) {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to delete student (HTTP ${response.status})`);
  }
  return response.text();
}
