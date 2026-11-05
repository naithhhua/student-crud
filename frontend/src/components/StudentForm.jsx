import React, { useState, useEffect, useRef } from 'react';
import { UserPlus, UserCheck, X, Sparkles, AlertCircle } from 'lucide-react';

const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  course: '',
  section: '',
};

export default function StudentForm({ editingStudent, onSubmit, onCancelEdit, isSubmitting }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const firstNameInputRef = useRef(null);

  const isEditing = Boolean(editingStudent && editingStudent.id != null);

  // When editingStudent prop changes, populate or reset the form
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setErrors({});
      firstNameInputRef.current?.focus();
    } else {
      setFormData(INITIAL_STATE);
      setErrors({});
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.section.trim()) newErrors.section = 'Section is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
    if (isEditing) {
      onCancelEdit();
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm ${
        isEditing
          ? 'border-amber-400 ring-2 ring-amber-100'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Form Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
              isEditing ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
            }`}
          >
            {isEditing ? <UserCheck className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 leading-snug">
              {isEditing ? 'Edit Student Details' : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing
                ? `Updating student ID #${editingStudent.id}`
                : 'Fill in details to register a new student'}
            </p>
          </div>
        </div>

        {isEditing && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Sparkles className="w-3 h-3" />
            Edit Mode
          </span>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* First & Last Name Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              ref={firstNameInputRef}
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="e.g. John"
              className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-slate-50/50 focus:bg-white transition-all outline-none ${
                errors.firstname
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            />
            {errors.firstname && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.firstname}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="e.g. Doe"
              className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-slate-50/50 focus:bg-white transition-all outline-none ${
                errors.lastname
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            />
            {errors.lastname && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.lastname}
              </p>
            )}
          </div>
        </div>

        {/* Course & Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Course / Degree <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. BSIT, BSCS"
              className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-slate-50/50 focus:bg-white transition-all outline-none ${
                errors.course
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            />
            {errors.course && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.course}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="e.g. 3A, 2B"
              className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-slate-50/50 focus:bg-white transition-all outline-none ${
                errors.section
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            />
            {errors.section && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.section}
              </p>
            )}
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm transition-all disabled:opacity-60 cursor-pointer ${
              isEditing
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
            }`}
          >
            {isEditing ? (
              <>
                <UserCheck className="w-4 h-4" />
                {isSubmitting ? 'Updating Student...' : 'Update Student'}
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                {isSubmitting ? 'Saving Student...' : 'Add Student'}
              </>
            )}
          </button>

          {(isEditing || formData.firstname || formData.lastname || formData.course || formData.section) && (
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <X className="w-4 h-4" />
              {isEditing ? 'Cancel Edit' : 'Clear'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
