
// This is a simulated detection API for demonstration purposes.
// In a real application, this would call a backend service that uses actual ML models.

export interface DetectionResult {
  real: number;
  fake: number;
  frameSuspects?: { timestamp: number; confidence: number }[];
  videoLength?: number;
}

/**
 * Analyzes a media file for deepfake detection
 * @param file The media file to analyze
 * @returns Promise with detection results
 */
export const analyzeMedia = async (file: File): Promise<DetectionResult> => {
  // Simulate API call and processing time
  return new Promise((resolve) => {
    console.log("Analyzing file:", file.name);
    
    // Simulate processing delay
    setTimeout(() => {
      // For demonstration purposes, generate random results
      // In a real app, this would be the result from a machine learning model
      let fakeScore: number;
      let frameSuspects: { timestamp: number; confidence: number }[] = [];
      let videoLength: number | undefined = undefined;
      
      // For demonstration purpose, generate more varied results
      // Images with "fake" in the name will have higher fake scores
      if (file.name.toLowerCase().includes('fake')) {
        fakeScore = Math.floor(Math.random() * 30) + 70; // 70-99% fake
      } else {
        // Random score, but weighted toward real (lower fake scores)
        fakeScore = Math.floor(Math.random() * 50); // 0-49% fake
      }
      
      const realScore = 100 - fakeScore;
      
      // If it's a video, generate simulated frame analysis data
      if (file.type.startsWith('video/')) {
        // Simulate a video of random length between 10-60 seconds
        videoLength = Math.floor(Math.random() * 50) + 10;
        
        // Generate 3-7 suspicious frames for demonstration
        const suspiciousFramesCount = Math.floor(Math.random() * 5) + 3;
        
        for (let i = 0; i < suspiciousFramesCount; i++) {
          frameSuspects.push({
            // Random timestamp within video length
            timestamp: Math.floor(Math.random() * videoLength),
            // Random confidence level for this frame
            confidence: Math.floor(Math.random() * 100)
          });
        }
        
        // Sort by timestamp
        frameSuspects.sort((a, b) => a.timestamp - b.timestamp);
      }
      
      console.log("Analysis complete:", { 
        real: realScore, 
        fake: fakeScore,
        ...(videoLength ? { videoLength, frameSuspects } : {})
      });
      
      resolve({
        real: realScore,
        fake: fakeScore,
        ...(videoLength ? { videoLength, frameSuspects } : {})
      });
    }, 3000); // 3 second delay to simulate processing
  });
};

/**
 * Gets highlighted areas of potential manipulation
 * This would return coordinates or a mask for visualization
 * Not implemented in this demo
 */
export const getManipulationMap = async (fileId: string): Promise<any> => {
  // This would return data to highlight manipulated areas
  return {}; 
};

/**
 * Simulated function to get detection confidence metrics
 */
export const getDetectionMetrics = async (analysisId: string): Promise<any> => {
  return {
    faceManipulation: Math.random() * 100,
    backgroundInconsistency: Math.random() * 100,
    textureAnalysis: Math.random() * 100,
    metadataAnalysis: Math.random() * 100,
  };
};

/**
 * Format seconds to MM:SS format
 */
export const formatTimestamp = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
