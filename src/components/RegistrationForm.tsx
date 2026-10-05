import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { isValidName, isValidEmail, isValidPhone } from '../lib/validation'
import { buildPayload, submitRegistration } from '../lib/webhook'
import { trackLead } from '../lib/pixel'

export default function RegistrationForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [consentTimestamp, setConsentTimestamp] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({})
  const [submitting, setSubmitting] = useState(false)

  function handleConsentChange(checked: boolean) {
    setConsent(checked)
    if (checked) setConsentTimestamp(new Date().toISOString())
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return

    const nameValid = isValidName(name)
    const emailValid = isValidEmail(email)
    const phoneValid = isValidPhone(phone)
    setErrors({
      name: nameValid ? undefined : 'Please enter your name',
      email: emailValid ? undefined : 'Enter a valid email address',
      phone: phoneValid ? undefined : 'Enter a valid phone number',
    })
    if (!nameValid || !emailValid || !phoneValid || !consent) return

    setSubmitting(true)
    const payload = buildPayload(name, email, phone, consentTimestamp)
    await submitRegistration(payload)
    trackLead()
    window.location.href = import.meta.env.VITE_TELEGRAM_URL ?? '/'
  }

  return (
    <div
      id="hero-form"
      className="w-full max-w-md mx-auto lg:mx-0 bg-wt-white rounded-3xl shadow-card p-[clamp(18px,3vw,28px)] flex flex-col gap-5 scroll-mt-24"
    >
      <div className="flex flex-col gap-1 text-left">
        <h2 className="text-xl font-bold text-wt-blue-deep">Register for the Boot Camp</h2>
        <p className="text-wt-gray-text text-sm">
          Monday 12th – Friday 16th October, 2026 · Golden Top Hotel, Enugu
        </p>
      </div>
      <div className="flex items-start gap-3 rounded-2xl border-2 border-wt-gold bg-wt-gold/15 px-4 py-3.5">
        <AlertTriangle size={20} className="shrink-0 mt-0.5 text-wt-gold" />
        <p className="text-[13px] leading-[1.5] text-wt-blue-deep">
          <span className="font-bold">Already registered for this bootcamp? Please do not register again.</span>{' '}
          <span className="font-normal">
            Registering more than once causes duplicate entries and can affect your seat confirmation.
            <span className="font-bold">This is a paid, training-focused boot camp. Gift items and giveaways will not be shared.</span>{' '}
          </span>
        </p>
      </div>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 text-left">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-wt-blue-deep">
            First name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-2xl border-2 border-[#E5EAFB] px-4 py-3.5 min-h-[56px] text-wt-blue-deep outline-none focus:border-wt-blue"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-wt-blue-deep">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl border-2 border-[#E5EAFB] px-4 py-3.5 min-h-[56px] text-wt-blue-deep outline-none focus:border-wt-blue"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-semibold text-wt-blue-deep">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-2xl border-2 border-[#E5EAFB] px-4 py-3.5 min-h-[56px] text-wt-blue-deep outline-none focus:border-wt-blue"
          />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
        </div>
        <label className="flex items-start gap-3 py-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => handleConsentChange(e.target.checked)}
            className="mt-0.5 shrink-0 w-5 h-5 rounded accent-wt-blue"
          />
          <span className="text-[13px] leading-[1.5] text-wt-gray-text">
            I agree to the{' '}
            <Link
              to="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wt-blue underline"
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              to="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wt-blue underline"
            >
              Terms
            </Link>
            , and consent to being contacted about this event by Telegram and email.
          </span>
        </label>
        <p className="text-[13px] leading-[1.5] text-wt-blue-deep">
          <span className="font-bold">Only register once.</span>{' '}
          <span className="font-normal">Duplicate entries will be merged.</span>
        </p>
        <button
          type="submit"
          disabled={!consent || submitting}
          className="btn-shine bg-gradient-brand text-white font-semibold text-lg rounded-xl px-8 py-4 shadow-md transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {submitting ? 'Reserving your seat...' : 'RESERVE MY SEAT & JOIN ON TELEGRAM'}
        </button>
        <p className="text-center text-wt-gray-text text-[13px]">
          Free entry. You will be taken to our Telegram community instantly.
        </p>
      </form>
    </div>
  )
}
