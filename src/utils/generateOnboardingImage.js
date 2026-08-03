import * as htmlToImage from "html-to-image";

export async function generateOnboardingImage(elementId) {
  const node = document.getElementById(elementId);

  if (!node) {
    throw new Error("Onboarding Pass element not found.");
  }

  try {
    // Clean capture without any DOM cloning hacks
    const dataUrl = await htmlToImage.toPng(node, {
      pixelRatio: 4, 
      cacheBust: false,
      useCORS: true,
    });

    return dataUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}