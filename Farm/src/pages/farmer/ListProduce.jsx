import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Upload, Plus, X } from 'lucide-react'
import { createProduce } from '../../services/api'

const nigerianStates = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa',
  'Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger',
  'Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara',
  'FCT Abuja'
]

const categories = ['vegetables','tubers','grains','fruits','spices','livestock','other']

const ListProduce = () => {
  const navigate     = useNavigate()
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [form, setForm] = useState({
    name:        '',
    description: '',
    category:    'vegetables',
    price:       '',
    unit:        '',
    quantity:    '',
    state:       '',
    address:     '',
    images:      [],
  })

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const addImage = () => {
    if (imageUrl.trim() && !form.images.includes(imageUrl)) {
      setForm((prev) => ({ ...prev, images: [...prev.images, imageUrl.trim()] }))
      setImageUrl('')
    }
  }

  const removeImage = (url) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((i) => i !== url) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.images.length === 0) {
      setError('Please add at least one image URL')
      return
    }
    setLoading(true)
    setError('')
    try {
      await createProduce({
        ...form,
        price:    parseFloat(form.price),
        quantity: parseInt(form.quantity),
      })
      navigate('/farmer/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to list produce. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pb-24" style={{background: '#F8F4E9', paddingTop: '100px'}}>
      <div className="max-w-2xl mx-auto px-8 md:px-16">

        {/* BACK */}
        <Link to="/farmer/dashboard"
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium"
          style={{color: '#1B4332'}}>
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* HEADER */}
        <div className="mb-10">
          <span className="section-tag">New Listing</span>
          <h1 className="font-display font-bold text-3xl" style={{color: '#1B4332'}}>
            List Your Produce
          </h1>
          <p className="text-sm font-light mt-2" style={{color: '#6b6b6b'}}>
            Fill in the details below to list your produce on the marketplace
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {error && (
            <div className="p-4 text-sm"
              style={{background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca'}}>
              {error}
            </div>
          )}

          <div className="bg-white p-8" style={{border: '1px solid #e5e0d5'}}>
            <p className="text-[10px] tracking-[2px] uppercase mb-6 font-semibold"
              style={{color: '#D4A017'}}>
              Basic Information
            </p>
            <div className="flex flex-col gap-5">
              <div>
                <label className="form-label">Produce Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="e.g. Fresh Tomatoes"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  placeholder="Describe your produce — quality, how it was grown, best uses..."
                  className="form-input"
                  rows={4}
                  style={{resize: 'none'}}
                  required
                />
              </div>
              <div>
                <label className="form-label">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => update('category', e.target.value)}
                  className="form-input"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="capitalize">{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-8" style={{border: '1px solid #e5e0d5'}}>
            <p className="text-[10px] tracking-[2px] uppercase mb-6 font-semibold"
              style={{color: '#D4A017'}}>
              Pricing & Quantity
            </p>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="form-label">Price (₦)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => update('price', e.target.value)}
                    placeholder="e.g. 4500"
                    className="form-input"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Unit</label>
                  <input
                    type="text"
                    value={form.unit}
                    onChange={(e) => update('unit', e.target.value)}
                    placeholder="e.g. basket, bag, kg"
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Available Quantity</label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={(e) => update('quantity', e.target.value)}
                  placeholder="How many units do you have?"
                  className="form-input"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8" style={{border: '1px solid #e5e0d5'}}>
            <p className="text-[10px] tracking-[2px] uppercase mb-6 font-semibold"
              style={{color: '#D4A017'}}>
              Location
            </p>
            <div className="flex flex-col gap-5">
              <div>
                <label className="form-label">State</label>
                <select
                  value={form.state}
                  onChange={(e) => update('state', e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="">Select state</option>
                  {nigerianStates.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Farm Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => update('address', e.target.value)}
                  placeholder="e.g. Along Kaduna-Zaria Road"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8" style={{border: '1px solid #e5e0d5'}}>
            <p className="text-[10px] tracking-[2px] uppercase mb-6 font-semibold"
              style={{color: '#D4A017'}}>
              Produce Images
            </p>
            <p className="text-xs mb-4 font-light" style={{color: '#6b6b6b'}}>
              Upload your images to Cloudinary and paste the URLs below
            </p>
            <div className="flex gap-0 mb-4">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste Cloudinary image URL here"
                className="form-input flex-1"
                style={{borderRadius: 0}}
              />
              <button
                type="button"
                onClick={addImage}
                className="btn-primary flex items-center gap-1 px-5"
              >
                <Plus size={14} />
                Add
              </button>
            </div>
            {form.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {form.images.map((url) => (
                  <div key={url} className="relative h-24 overflow-hidden"
                    style={{border: '1px solid #e5e0d5'}}>
                    <img src={url} alt="produce" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center"
                      style={{background: '#ef4444'}}>
                      <X size={12} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-center"
          >
            {loading ? 'Listing Produce...' : 'List Produce on Marketplace'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default ListProduce