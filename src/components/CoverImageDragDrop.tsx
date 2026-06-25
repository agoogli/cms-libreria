'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useField } from '@payloadcms/ui'
import styles from './CoverImageDragDrop.module.css'

interface CoverImageDragDropProps {
  path: string
  label?: string
  required?: boolean
  description?: string
}

interface MediaDocument {
  id: number
  url: string
  alt: string
  filename: string
  filesize?: number
  width?: number
  height?: number
}

export const CoverImageDragDrop: React.FC<CoverImageDragDropProps> = ({
  path,
  label,
  required,
  description,
}) => {
  // Hook to connect with Payload form state
  const { value, setValue, showError, errorMessage } = useField<number | null>({ path })

  // Local state
  const [mediaData, setMediaData] = useState<MediaDocument | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch details of the cover image if a value (Media ID) exists
  useEffect(() => {
    if (!value) {
      setMediaData(null)
      return
    }

    // Handle case if value is already a populated object (unlikely but possible in some hook variations)
    if (typeof value === 'object' && value !== null) {
      const valObj = value as any
      if (valObj.url && valObj.id) {
        setMediaData({
          id: Number(valObj.id),
          url: valObj.url,
          alt: valObj.alt || '',
          filename: valObj.filename || '',
        })
        return
      }
    }

    // Standard case: value is a number (ID). Fetch from Payload REST API
    let isMounted = true
    const fetchMediaDetails = async () => {
      setLoading(true)
      setLocalError(null)
      try {
        const response = await fetch(`/api/media/${value}`)
        if (!response.ok) {
          throw new Error(`Impossibile caricare i dettagli dell'immagine (${response.status})`)
        }
        const data = await response.json()
        if (isMounted) {
          setMediaData({
            id: data.id,
            url: data.url,
            alt: data.alt || '',
            filename: data.filename || '',
          })
        }
      } catch (err: any) {
        if (isMounted) {
          console.error(err)
          setLocalError('Impossibile caricare l\'anteprima dell\'immagine copertina.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchMediaDetails()

    return () => {
      isMounted = false
    }
  }, [value])

  // Handle file upload
  const uploadFile = async (file: File) => {
    if (!file) return

    // Client-side validation: must be an image
    if (!file.type.startsWith('image/')) {
      setLocalError('Il file selezionato non è un\'immagine valida. Seleziona un file PNG, JPG, WEBP, o GIF.')
      return
    }

    // Client-side validation: max size 10MB
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      setLocalError('Il file supera la dimensione massima consentita di 10MB.')
      return
    }

    setUploading(true)
    setLocalError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      
      // Auto-generate alt text based on file name (frictionless)
      const rawName = file.name
      const cleanName = rawName.substring(0, rawName.lastIndexOf('.')) || rawName
      formData.append(
        '_payload',
        JSON.stringify({
          alt: `Copertina: ${cleanName}`,
        })
      )

      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const errorMsg = errorData?.errors?.[0]?.message || `Errore HTTP ${response.status}`
        throw new Error(`Errore durante il caricamento: ${errorMsg}`)
      }

      const data = await response.json()
      const doc = data.doc || data

      if (doc && doc.id) {
        // Set the relationship field value to the newly uploaded Media ID
        setValue(doc.id)
        // Store the details locally to render the preview immediately
        setMediaData({
          id: doc.id,
          url: doc.url,
          alt: doc.alt || '',
          filename: doc.filename || '',
        })
      } else {
        throw new Error('Risposta dell\'API non valida.')
      }
    } catch (err: any) {
      console.error(err)
      setLocalError(err.message || 'Errore di rete durante il caricamento.')
    } finally {
      setUploading(false)
    }
  }

  // File input change handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      uploadFile(files[0])
    }
  }

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      uploadFile(files[0])
    }
  }

  // Trigger file selection
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Remove relation
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setValue(null)
    setMediaData(null)
  }

  const displayLabel = label || 'Immagine Copertina'

  return (
    <div className={styles.fieldContainer}>
      {/* Field Label */}
      <label className={styles.label}>
        {displayLabel}
        {required && <span className={styles.required}>*</span>}
      </label>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Main UI Area */}
      {mediaData ? (
        /* Image Preview State - Premium 3D Book Layout */
        <div className={styles.previewContainer}>
          <div className={styles.bookCover}>
            <div className={styles.bookSpineCrease} />
            <img
              src={mediaData.url}
              alt={mediaData.alt || 'Copertina'}
              className={styles.bookImage}
            />
          </div>
          <div className={styles.infoPanel}>
            <div className={styles.metaInfo}>
              <div className={styles.filename}>{mediaData.filename}</div>
              <div className={styles.altText}>Alt text: {mediaData.alt}</div>
            </div>
            <div className={styles.actionButtons}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={triggerFileSelect}
                disabled={uploading}
              >
                Sostituisci
              </button>
              <a
                href={mediaData.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnSecondary}`}
                style={{ textDecoration: 'none' }}
              >
                Apri originale
              </a>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnDanger}`}
                onClick={handleRemove}
              >
                Rimuovi
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Drag & Drop Upload Zone */
        <div
          className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
          onClick={triggerFileSelect}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Upload SVG Icon */}
          <svg
            className={styles.uploadIcon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>

          <span className={styles.mainText}>
            Trascina qui l'immagine di copertina oppure <span style={{ color: 'var(--theme-success, #0070f3)', fontWeight: 600 }}>sfoglia</span>
          </span>
          <span className={styles.subText}>
            Supporta immagini JPG, PNG, WEBP e GIF (max 10MB)
          </span>

          {/* Loader Overlay when uploading or loading initial preview */}
          {(uploading || loading) && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner} />
              <div className={styles.loadingText}>
                {uploading ? 'Caricamento immagine...' : 'Caricamento anteprima...'}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Description */}
      {description && <div className={styles.subText} style={{ marginTop: '6px', textAlign: 'left' }}>{description}</div>}

      {/* Custom Error Banner */}
      {localError && (
        <div className={styles.errorBanner}>
          <svg
            className={styles.errorIcon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>{localError}</div>
          <div className={styles.errorClose} onClick={() => setLocalError(null)}>
            &times;
          </div>
        </div>
      )}

      {/* Payload Standard Validation Error */}
      {showError && (
        <div className={styles.errorBanner} style={{ marginTop: '8px' }}>
          <svg
            className={styles.errorIcon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>{errorMessage}</div>
        </div>
      )}
    </div>
  )
}

export default CoverImageDragDrop
