import { DeliveryTruckIcon, OriginalSealIcon, EasyReturnsIcon, PayOnDeliveryIcon, FreeTagIcon } from '../components/DeliveryIcons'

const COLOR = '#C41E3A'
const SIZE = 64

const icons = [
  { icon: <DeliveryTruckIcon size={SIZE} color={COLOR} />, label: 'Ships in\n7 Days' },
  { icon: <OriginalSealIcon size={SIZE} color={COLOR} />, label: '100%\nOriginal' },
  { icon: <EasyReturnsIcon size={SIZE} color={COLOR} />, label: 'Easy\nReturns' },
  { icon: <PayOnDeliveryIcon size={SIZE} color={COLOR} />, label: 'Pay on\nDelivery' },
  { icon: <FreeTagIcon size={SIZE} color={COLOR} />, label: 'Free above\n₹1200' },
]

export default function IconPreview() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-10">Delivered within 7 days</p>
      <div className="flex gap-12 items-start">
        {icons.map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-4">
            {icon}
            <span className="text-sm font-semibold text-gray-800 text-center leading-snug whitespace-pre-line">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
