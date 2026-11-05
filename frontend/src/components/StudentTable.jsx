import React from 'react';
import { Pencil, User, Search, AlertCircle, RefreshCw } from 'lucide-react';
import InlineDeleteAction from './InlineDeleteAction';

export default function StudentTable({
  students,
  searchTerm,
  onSearchChange,
  onEdit,
  editingStudentId,
  onDelete,
  deletingId,
  isLoading,
}) {
  // Client-side filtering by name, course, or section
  const filteredStudents = students.filter((s) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    const fullName = `${s.firstname || ''} ${s.lastname || ''}`.toLowerCase();
    const course = (s.course || '').toLowerCase();
    const section = (s.section || '').toLowerCase();
    const id = String(s.id || '');
    return (
      fullName.includes(q) ||
      course.includes(q) ||
      section.includes(q) ||
      id.includes(q)
    );
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Table Header & Search Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between bg-slate-50/50">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Student Directory</h2>
          <p className="text-xs text-slate-500">
            {filteredStudents.length} of {students.length} students showing
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search name, course, section..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold p-0.5"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-xs uppercase font-semibold text-slate-500 tracking-wider">
              <th className="py-3 px-4 w-16">ID</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Section</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && students.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <RefreshCw className="w-6 h-6 animate-spin text-indigo-500" />
                    <span className="text-sm font-medium">Loading student records...</span>
                  </div>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    {students.length === 0 ? (
                      <>
                        <p className="text-sm font-medium text-slate-800">No students registered yet</p>
                        <p className="text-xs text-slate-500">
                          Use the form on the left to add the first student record.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-slate-800">No matching students found</p>
                        <p className="text-xs text-slate-500">
                          Try searching with a different keyword or{' '}
                          <button
                            onClick={() => onSearchChange('')}
                            className="text-indigo-600 hover:underline font-medium"
                          >
                            clear the search
                          </button>
                          .
                        </p>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const isSelectedForEdit = editingStudentId === student.id;
                return (
                  <tr
                    key={student.id}
                    className={`transition-colors duration-150 ${
                      isSelectedForEdit
                        ? 'bg-amber-50/70 border-l-4 border-l-amber-500'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-500 font-semibold">
                      #{student.id}
                    </td>

                    {/* Student Name */}
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold border border-indigo-100">
                          {student.firstname ? student.firstname.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">
                            {student.lastname}, {student.firstname}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {student.course}
                      </span>
                    </td>

                    {/* Section */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        {student.section}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center justify-end gap-1">
                        {/* Edit Button */}
                        <button
                          onClick={() => onEdit(student)}
                          title="Edit student"
                          className={`inline-flex items-center gap-1 p-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            isSelectedForEdit
                              ? 'bg-amber-100 text-amber-800 font-semibold'
                              : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
                          }`}
                        >
                          <Pencil className="w-4 h-4" />
                          <span className="sr-only">Edit</span>
                        </button>

                        {/* Inline Delete Button (No Modal) */}
                        <InlineDeleteAction
                          studentId={student.id}
                          studentName={`${student.firstname} ${student.lastname}`}
                          onDelete={onDelete}
                          isDeleting={deletingId === student.id}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
