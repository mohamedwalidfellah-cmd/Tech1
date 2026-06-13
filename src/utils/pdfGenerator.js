import jsPDF from 'jspdf'

export const generateInvoicePDF = (invoiceData) => {
  const pdf = new jsPDF()
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  let yPosition = 20

  // En-tête
  pdf.setFillColor(26, 26, 26)
  pdf.rect(0, 0, pageWidth, 30, 'F')
  pdf.setTextColor(255, 215, 0)
  pdf.setFontSize(24)
  pdf.text('AutoDiag', 20, 20)
  pdf.setFontSize(10)
  pdf.setTextColor(255, 255, 255)
  pdf.text('Diagnostic & Réparation Électrique', 20, 26)

  yPosition = 45
  pdf.setTextColor(26, 26, 26)
  pdf.setFontSize(18)
  pdf.text('FACTURE', 20, yPosition)
  yPosition += 15

  pdf.setFontSize(10)
  pdf.text(`Facture N°: ${invoiceData.invoiceNumber}`, 20, yPosition)
  pdf.text(`Date: ${new Date(invoiceData.date).toLocaleDateString('fr-FR')}`, pageWidth - 60, yPosition)
  yPosition += 10

  pdf.setFontSize(11)
  pdf.setFont(undefined, 'bold')
  pdf.text('Client:', 20, yPosition)
  yPosition += 7
  pdf.setFont(undefined, 'normal')
  pdf.setFontSize(10)
  pdf.text(`${invoiceData.clientName} | ${invoiceData.clientPhone}`, 25, yPosition)
  yPosition += 10

  pdf.setFont(undefined, 'bold')
  pdf.setFontSize(11)
  pdf.text('Véhicule:', 20, yPosition)
  yPosition += 7
  pdf.setFont(undefined, 'normal')
  pdf.setFontSize(10)
  pdf.text(`${invoiceData.vehicleBrand} ${invoiceData.vehicleModel} (${invoiceData.vehicleYear})`, 25, yPosition)
  yPosition += 5
  pdf.text(`Immatriculation: ${invoiceData.immatriculation}`, 25, yPosition)
  yPosition += 10

  pdf.setFillColor(255, 215, 0)
  pdf.setTextColor(26, 26, 26)
  pdf.setFont(undefined, 'bold')
  pdf.rect(20, yPosition, pageWidth - 40, 7, 'F')
  pdf.text('Détail des Prestations', 25, yPosition + 5)
  yPosition += 12

  pdf.setFont(undefined, 'normal')
  pdf.setFontSize(10)
  pdf.setTextColor(26, 26, 26)

  pdf.text('Frais de déplacement & Diagnostic', 25, yPosition)
  pdf.text(`${invoiceData.displacementCost} DA`, pageWidth - 45, yPosition, { align: 'right' })
  yPosition += 6

  if (invoiceData.parts && invoiceData.parts.length > 0) {
    invoiceData.parts.forEach(part => {
      pdf.text(`- ${part.name}`, 30, yPosition)
      pdf.text(`${part.quantity} x ${part.unitPrice} DA`, pageWidth - 45, yPosition, { align: 'right' })
      yPosition += 6
    })
  }

  if (invoiceData.laborCost) {
    yPosition += 2
    pdf.text('Main d\'œuvre', 25, yPosition)
    pdf.text(`${invoiceData.laborCost} DA`, pageWidth - 45, yPosition, { align: 'right' })
    yPosition += 6
  }

  yPosition += 3
  pdf.setDrawColor(200, 200, 200)
  pdf.line(20, yPosition, pageWidth - 20, yPosition)
  yPosition += 5

  pdf.setFont(undefined, 'bold')
  pdf.setFontSize(12)
  pdf.text('TOTAL À PAYER:', 25, yPosition)
  pdf.setTextColor(255, 215, 0)
  pdf.text(`${invoiceData.totalAmount} DA`, pageWidth - 45, yPosition, { align: 'right' })

  pdf.setTextColor(26, 26, 26)
  pdf.setFontSize(9)
  pdf.setFont(undefined, 'italic')
  pdf.text('Merci de votre confiance !', 20, pageHeight - 20)

  pdf.save(`facture_${invoiceData.invoiceNumber}.pdf`)
}

export const sendInvoiceViaWhatsApp = (invoiceData) => {
  const message = encodeURIComponent(
    `Bonjour ${invoiceData.clientName},\n\n` +
    `Votre facture AutoDiag a été générée.\n` +
    `Facture N°: ${invoiceData.invoiceNumber}\n` +
    `Montant Total: ${invoiceData.totalAmount} DA\n\n` +
    `Véhicule: ${invoiceData.vehicleBrand} ${invoiceData.vehicleModel}\n` +
    `Immatriculation: ${invoiceData.immatriculation}\n\n` +
    `Merci !`
  )
  window.open(`https://wa.me/${invoiceData.clientPhone}?text=${message}`, '_blank')
}
