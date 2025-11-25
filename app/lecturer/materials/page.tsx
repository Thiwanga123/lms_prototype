'use client';

import { Plus, Upload, FileText, Video, Image, File, Edit, Trash2, X, Paperclip } from 'lucide-react';
import { useState } from 'react';

interface Material {
  id: number;
  course: string;
  title: string;
  type: string;
  uploaded: string;
  size: string;
  file?: File | null;
}

const MaterialsPage = () => {
  const [materials, setMaterials] = useState<Material[]>([
    { id: 1, course: 'CHC50121 Diploma', title: 'Introduction to Positive Behaviour Support', type: 'pdf', uploaded: '2025-11-05', size: '2.5 MB' },
    { id: 2, course: 'CHC50121 Diploma', title: 'Building Respectful Relationships Video', type: 'video', uploaded: '2025-11-03', size: '45 MB' },
    { id: 3, course: 'CHCECE045', title: 'Child Development Stages Guide', type: 'pdf', uploaded: '2025-11-01', size: '1.8 MB' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [formData, setFormData] = useState({
    course: '',
    title: '',
    type: 'pdf',
    size: '',
    file: null as File | null,
  });

  const courses = ['CHC50121 Diploma Early Childhood Education and Care', 'CHCECE045 - Foster Positive Interactions', 'CHCECE046 - Inclusion Strategies'];

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setFormData({
        ...formData,
        file: file,
        size: `${sizeInMB} MB`,
        type: file.type.includes('video') ? 'video' : file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'document',
      });
    }
  };

  const handleOpenModal = (material?: Material) => {
    if (material) {
      setEditingMaterial(material);
      setFormData({
        course: material.course,
        title: material.title,
        type: material.type,
        size: material.size,
        file: null,
      });
    } else {
      setEditingMaterial(null);
      setFormData({
        course: '',
        title: '',
        type: 'pdf',
        size: '',
        file: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMaterial(null);
    setFormData({
      course: '',
      title: '',
      type: 'pdf',
      size: '',
      file: null,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMaterial) {
      // Update existing material
      setMaterials(materials.map(m => 
        m.id === editingMaterial.id 
          ? { 
              ...editingMaterial, 
              course: formData.course,
              title: formData.title,
              type: formData.type,
              size: formData.size || editingMaterial.size,
              uploaded: editingMaterial.uploaded
            }
          : m
      ));
    } else {
      // Create new material
      if (!formData.file && !formData.size) {
        alert('Please upload a file or provide file size');
        return;
      }
      const newMaterial: Material = {
        id: materials.length + 1,
        course: formData.course,
        title: formData.title,
        type: formData.type,
        size: formData.size || '0 MB',
        uploaded: new Date().toISOString().split('T')[0],
        file: formData.file,
      };
      setMaterials([...materials, newMaterial]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this material?')) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Course Materials</h1>
          <p className="text-sm lg:text-base text-gray-600">Upload and manage course materials for your students</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          Add Material
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {materials.map((material) => (
          <div
            key={material.id}
            className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                  {getIcon(material.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm lg:text-base">{material.title}</h3>
                  <p className="text-xs lg:text-sm text-gray-600">{material.course}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs lg:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-semibold text-gray-800 uppercase">{material.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-semibold text-gray-800">{material.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Uploaded:</span>
                <span className="font-semibold text-gray-800">{new Date(material.uploaded).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => handleOpenModal(material)}
                className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-purple-200 transition-all flex items-center justify-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                Edit
              </button>
              <button 
                onClick={() => handleDelete(material.id)}
                className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-red-200 transition-all flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingMaterial ? 'Edit Material' : 'Add New Material'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                  placeholder="Enter material title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="video">Video</option>
                  <option value="image">Image</option>
                  <option value="document">Document (Word, etc.)</option>
                  <option value="presentation">Presentation (PowerPoint)</option>
                  <option value="link">External Link</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                  {formData.type === 'pdf' && ' (PDF)'}
                  {formData.type === 'video' && ' (Video: MP4, MOV, etc.)'}
                  {formData.type === 'image' && ' (Image: JPG, PNG, etc.)'}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-purple-200 border-dashed rounded-lg hover:border-purple-300 transition-colors">
                  <div className="space-y-1 text-center">
                    <Paperclip className="mx-auto h-8 w-8 text-purple-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept={
                            formData.type === 'pdf' ? '.pdf' :
                            formData.type === 'video' ? 'video/*' :
                            formData.type === 'image' ? 'image/*' :
                            '*/*'
                          }
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {formData.type === 'pdf' && 'PDF up to 10MB'}
                      {formData.type === 'video' && 'Video up to 500MB'}
                      {formData.type === 'image' && 'PNG, JPG, GIF up to 10MB'}
                      {!['pdf', 'video', 'image'].includes(formData.type) && 'Any file type'}
                    </p>
                    {formData.file && (
                      <p className="text-xs text-green-600 mt-2">
                        Selected: {formData.file.name} ({formData.size})
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {formData.type === 'link' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">External Link URL</label>
                  <input
                    type="url"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                    placeholder="https://example.com"
                  />
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-purple-600 transition-all"
                >
                  {editingMaterial ? 'Update' : 'Upload Material'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialsPage;
