import './components/redesign-tokens.css'
import { AnnPaleClient } from './annpale-client'
import { NoiseOverlay } from './components/noise-overlay'
import { MOCK_CREATORS } from './data/mock-data'

export default function AnnPaleDemo() {
  return (
    <div className="redesign">
      <NoiseOverlay />
      <AnnPaleClient creators={MOCK_CREATORS} />
    </div>
  )
}
