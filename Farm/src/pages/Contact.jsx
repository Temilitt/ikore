import { useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle, Send } from 'lucide-react'

const Contact = () => {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1500)
  }

  return (
    <div className="min-h-screen pb-24" style={{background: '#F8F4E9', paddingTop: '100px'}}>

      {/* HEADER */}
      <div style={{background: '#0D2016'}}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
          <span className="section-tag">Get In Touch</span>
          <h1 className="font-display font-bold text-white"
            style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}>
            Contact Us
          </h1>
          <p className="font-light mt-4 max-w-md"
            style={{color: 'rgba(255,255,255,0.5)'}}>
            Have a question about Ikore? Want to partner with us?
            We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT */}
        <div className="flex flex-col gap-8">
          {[
            { icon: Phone,  label: 'Phone',   value: '09016196558',                       sub: 'Mon-Sat, 8am-8pm'        },
            { icon: Mail,   label: 'Email',   value: 'aderounmutemiloluwa2004@gmail.com', sub: 'We reply within 2 hours' },
            { icon: MapPin, label: 'Address', value: 'Ibadan, Oyo State',                 sub: 'Nigeria'                 },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{background: '#f0fdf4'}}>
                <Icon size={16} style={{color: '#1B4332'}} />
              </div>
              <div>
                <p className="text-[10px] tracking-[2px] uppercase mb-1 font-semibold"
                  style={{color: '#D4A017'}}>
                  {label}
                </p>
                <p className="font-medium text-sm" style={{color: '#1B4332'}}>{value}</p>
                <p className="text-xs font-light" style={{color: '#6b6b6b'}}>{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 bg-white p-8" style={{border: '1px solid #e5e0d5'}}>
          {done ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                style={{background: '#f0fdf4'}}>
                <CheckCircle size={32} style={{color: '#1B4332'}} />
              </div>
              <h3 className="font-display font-bold text-2xl mb-3" style={{color: '#1B4332'}}>
                Message Sent!
              </h3>
              <p className="text-sm font-light mb-8" style={{color: '#6b6b6b'}}>
                Thanks for reaching out. We'll get back to you within 2 hours.
              </p>
              <button
                onClick={() => { setDone(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                className="btn-outline"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Full Name</label>
                  <input type="text" value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Adaeze Okonkwo" className="form-input" required />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input type="email" value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="adaeze@gmail.com" className="form-input" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Phone</label>
                  <input type="tel" value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="08012345678" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Subject</label>
                  <select value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    className="form-input" required>
                    <option value="">Select subject</option>
                    <option>General Inquiry</option>
                    <option>Farmer Registration</option>
                    <option>Bulk Order</option>
                    <option>Partnership</option>
                    <option>Complaint</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Message</label>
                <textarea value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Tell us how we can help..."
                  className="form-input" rows={6} style={{resize: 'none'}} required />
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary flex items-center justify-center gap-2">
                {loading ? 'Sending...' : <><Send size={15} /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact