import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { Card } from '../components/ui/Card'
import { TextField } from '../components/ui/TextField'
import { TextArea } from '../components/ui/TextArea'
import { Button } from '../components/ui/Button'
import { DestructiveButton } from '../components/ui/DestructiveButton'

export function ScreenSupportCreate() {
  const navigate = useNavigate()
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')

  return (
    <AppLayout activeNav="Support">
      {/* Header */}
      <div style={{ padding: 'var(--padding-XXXL) var(--padding-XXXL) 0' }}>
        <h1 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 32, lineHeight: '40px', color: 'var(--fg-primary)' }}>
          Support
        </h1>
      </div>

      {/* Centered form card */}
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: 'var(--padding-XL) var(--padding-XXXL)',
        }}
      >
        <Card
          icon="IconTemplate"
          showIcon={true}
          title="Create a template"
        >
          <div className="flex flex-col gap-(--gap-L)">
            <TextField
              label="Product name"
              placeholder="Your product"
              value={productName}
              onChange={setProductName}
            />
            <TextArea
              label="Description"
              placeholder="Describe what this template is for..."
              value={description}
              onChange={setDescription}
              counter
              maxLength={2000}
              rows={5}
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-(--gap-M)" style={{ marginTop: 'var(--gap-L)' }}>
            <DestructiveButton
              variant="Tertiary"
              showIcon={false}
              onClick={() => navigate('/app/support')}
            >
              Cancel
            </DestructiveButton>
            <Button
              variant="Primary"
              showIcon={false}
              disabled
            >
              Create form
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}
