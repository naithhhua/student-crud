const API_BASE_URL = '/nonog/students';

/**
 * Fetch all students
 */
export async function getAllStudents() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch students (HTTP ${response.status})`);
  }
  return response.json();
}

/**
 * Fetch a single student by ID
 */
export async function getStudentById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch student with ID ${id} (HTTP ${response.status})`);
  }
  return response.json();
}

/**
 * Create a new student
 */
export async function createStudent(studentData) {
  const response = await fetch(API_BASE_URL, {
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
  const response = await fetch(`${API_BASE_URL}/${id}`, {
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
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to delete student (HTTP ${response.status})`);
  }
  return response.text();
}
