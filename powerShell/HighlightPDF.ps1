param (
    [string]$InputFile = "C:\Users\jmanish\Desktop\powerShell\sample.pdf",  # Path to input PDF
    [string]$SearchText = "EC2",   # Text to search and highlight
    [string]$OutputFile = "C:\Users\jmanish\Desktop\powerShell\output.pdf"  # Path to save the modified PDF
)

# Create a Word Application COM Object
$word = New-Object -ComObject Word.Application
$word.Visible = $false  # Run Word in the background

# Open the PDF file in Word (auto converts to editable format)
$doc = $word.Documents.Open($InputFile)

# Select and find the search term
$find = $word.Selection.Find
$find.Text = $SearchText
$find.Forward = $true
$find.Wrap = 1  # wdFindContinue
$find.Format = $true

# Modify text formatting to simulate a "border"
while ($find.Execute()) {
    $selection = $word.Selection.Range
    $selection.Font.Bold = $true                  # Make text bold
    $selection.Font.Underline = 6                 # Apply a thick underline (wdUnderlineThick)
    $selection.Font.UnderlineColor = 255          # Red color
}

# Save the document as a PDF
$doc.SaveAs([ref]$OutputFile, [ref]17)  # 17 = wdFormatPDF

# Close the document and Word
$doc.Close($false)
$word.Quit()

# Release Word COM Object from memory
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null

Write-Host "✅ Formatted PDF saved successfully at $OutputFile"
