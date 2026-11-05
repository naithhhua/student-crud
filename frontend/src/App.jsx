import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import NotificationToast from './components/NotificationToast';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './api/studentService';
import { ServerOff, Info } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [backendError, setBackendError] = useState(null);

  const formSectionRef = useRef(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  // Fetch all students from backend
  const loadStudents = useCallback(async () => {
    setIsLoading(true);
    setBackendError(null);
    try {
      const data = await getAllStudents();
      // Spring repository findAll returns array or iterable
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching students:', err);
      const isConnectionError =
        err.message?.includes('Failed to fetch') ||
        err.message?.includes('NetworkError');
      const errorMsg = isConnectionError
        ? 'Could not connect to backend server. Make sure Spring Boot is running on port 8080.'
        : err.message || 'Failed to load students.';
      setBackendError(errorMsg);
      showNotification('error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Handle Form Submission (Create or Update)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent && editingStudent.id != null) {
        // Update existing student
        const updated = await updateStudent(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showNotification(
          'success',
          `Student "${updated.firstname} ${updated.lastname}" updated successfully!`
        );
        setEditingStudent(null);
      } else {
        // Create new student
        const created = await createStudent(formData);
        setStudents((prev) => [created, ...prev]);
        showNotification(
          'success',
          `Student "${created.firstname} ${created.lastname}" registered successfully!`
        );
      }
    } catch (err) {
      console.error('Error saving student:', err);
      showNotification('error', err.message || 'Failed to save student details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start editing a student
  const handleEdit = (student) => {
    setEditingStudent(student);
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Delete student (inline confirmation handled inside InlineDeleteAction)
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
      showNotification('success', `Student #${id} deleted successfully.`);
    } catch (err) {
      console.error('Error deleting student:', err);
      showNotification('error', err.message || `Failed to delete student #${id}.`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        studentCount={students.length}
        onRefresh={loadStudents}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Backend Connectivity Warning Banner if connection failed */}
        {backendError && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 shadow-xs">
            <ServerOff className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <p className="font-semibold">Backend Connection Notice</p>
              <p className="mt-0.5 text-xs text-amber-800">{backendError}</p>
              <p className="mt-2 text-xs text-amber-700">
                You can run your Spring Boot backend in another terminal with: <code className="bg-amber-100/70 px-1.5 py-0.5 rounded font-mono font-medium">.\mvnw.cmd spring-boot:run</code>
              </p>
            </div>
            <button
              onClick={loadStudents}
              className="text-xs font-semibold bg-amber-200/70 hover:bg-amber-300/80 px-2.5 py-1.5 rounded-lg transition-colors shrink-0"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Informational banner about No-Modal UX */}
        <div className="mb-6 flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 shadow-xs">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>
              <strong>Inline Dashboard Mode:</strong> Use the form on the left to add or edit records. Delete actions confirm right inside the table row without popup modals.
            </span>
          </div>
        </div>

        {/* Responsive Two-Column Grid (No Modals) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Add / Edit Form (4 cols on lg screens, sticky on desktop) */}
          <section ref={formSectionRef} className="lg:col-span-5 lg:sticky lg:top-24">
            <StudentForm
              editingStudent={editingStudent}
              onSubmit={handleFormSubmit}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </section>

          {/* Right Column: Search & Student Records Table (7 cols on lg screens) */}
          <section className="lg:col-span-7">
            <StudentTable
              students={students}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onEdit={handleEdit}
              editingStudentId={editingStudent ? editingStudent.id : null}
              onDelete={handleDelete}
              deletingId={deletingId}
              isLoading={isLoading}
            />
          </section>
        </div>
      </main>

      {/* Floating Notification Toast */}
      <NotificationToast
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </div>
  );
}
