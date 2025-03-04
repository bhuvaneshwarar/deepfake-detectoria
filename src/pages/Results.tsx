
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Check, ArrowLeft, Video, Clock, FileVideo } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatTimestamp, getDetectionMetrics } from '@/lib/deepfakeDetection';
import { DetectionResult } from '@/lib/deepfakeDetection';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<any>(null);
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);
  
  // Get the result and file data passed from the upload page
  const result = location.state?.result as DetectionResult | undefined;
  const fileData = location.state?.fileData as {
    name: string;
    type: string;
    size: number;
    url: string;
  } | undefined;
  
  useEffect(() => {
    if (!result || !fileData) {
      // Redirect back to home if no results are available
      navigate('/');
      return;
    }
    
    // Simulate fetching additional metrics
    const fetchMetrics = async () => {
      const data = await getDetectionMetrics('demo-analysis');
      setMetrics(data);
    };
    
    fetchMetrics();
  }, [result, fileData, navigate]);
  
  if (!result || !fileData) {
    return null; // This will redirect via the useEffect
  }
  
  const isVideo = fileData.type.startsWith('video/');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Upload
          </button>
          
          <div className="mb-8 animate-fade-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Analysis Results</h1>
            <p className="text-muted-foreground">
              {isVideo ? 'Video' : 'Image'} analyzed: <span className="font-medium">{fileData.name}</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Media Preview */}
            <div className="glass rounded-xl overflow-hidden animate-scale-in">
              {isVideo ? (
                <video 
                  src={fileData.url} 
                  controls 
                  className="w-full aspect-video object-contain bg-black/5"
                />
              ) : (
                <img 
                  src={fileData.url} 
                  alt="Analyzed media" 
                  className="w-full object-contain bg-black/5"
                />
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileVideo className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">{fileData.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {(fileData.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  {result.fake > 70 ? (
                    <div className="flex items-center text-destructive">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">High probability of manipulation</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-green-500">
                      <Check className="w-5 h-5 mr-2" />
                      <span className="font-medium">Likely authentic</span>
                    </div>
                  )}
                  <div className="text-xl font-bold">
                    {result.fake > 70 ? (
                      <span className="text-destructive">{result.fake}% fake</span>
                    ) : (
                      <span className="text-green-500">{result.real}% real</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results Data */}
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {/* Overall Confidence */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Analysis Confidence</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Real</span>
                      <span className="text-sm font-medium">{result.real}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-green-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${result.real}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Fake</span>
                      <span className="text-sm font-medium">{result.fake}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-destructive rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${result.fake}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Detailed Metrics */}
              {metrics && (
                <div className="glass rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Detection Metrics</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">Face Manipulation</h4>
                      <div className="flex items-center">
                        <div className="h-2 flex-grow bg-secondary rounded-full overflow-hidden mr-3">
                          <div 
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${metrics.faceManipulation}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-9">{Math.round(metrics.faceManipulation)}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">Background Inconsistency</h4>
                      <div className="flex items-center">
                        <div className="h-2 flex-grow bg-secondary rounded-full overflow-hidden mr-3">
                          <div 
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${metrics.backgroundInconsistency}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-9">{Math.round(metrics.backgroundInconsistency)}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">Texture Analysis</h4>
                      <div className="flex items-center">
                        <div className="h-2 flex-grow bg-secondary rounded-full overflow-hidden mr-3">
                          <div 
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${metrics.textureAnalysis}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-9">{Math.round(metrics.textureAnalysis)}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">Metadata Analysis</h4>
                      <div className="flex items-center">
                        <div className="h-2 flex-grow bg-secondary rounded-full overflow-hidden mr-3">
                          <div 
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${metrics.metadataAnalysis}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-9">{Math.round(metrics.metadataAnalysis)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Video Frame Analysis */}
              {isVideo && result.frameSuspects && result.videoLength && (
                <div className="glass rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Suspicious Frames</h3>
                  
                  <div className="relative mb-6">
                    {/* Video timeline */}
                    <div className="h-6 w-full bg-secondary/30 rounded-full overflow-hidden relative">
                      {/* Markers for suspicious frames */}
                      {result.frameSuspects.map((frame, index) => (
                        <button
                          key={index}
                          className={`absolute top-0 bottom-0 w-1 cursor-pointer transition-all
                            ${selectedFrame === index ? 'bg-destructive' : 'bg-destructive/70'}
                            hover:bg-destructive hover:w-1.5`}
                          style={{ 
                            left: `${(frame.timestamp / result.videoLength!) * 100}%`,
                            transform: 'translateX(-50%)',
                          }}
                          onClick={() => setSelectedFrame(index)}
                          title={`Suspicious activity at ${formatTimestamp(frame.timestamp)}`}
                        />
                      ))}
                    </div>
                    
                    {/* Timeline labels */}
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>0:00</span>
                      <span>{formatTimestamp(result.videoLength)}</span>
                    </div>
                  </div>
                  
                  {/* Selected frame details */}
                  {selectedFrame !== null && (
                    <div className="bg-secondary/30 p-4 rounded-lg animate-fade-in">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">
                            {formatTimestamp(result.frameSuspects[selectedFrame].timestamp)}
                          </span>
                        </div>
                        <span className="text-sm px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">
                          {result.frameSuspects[selectedFrame].confidence}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Suspicious activity detected at this timestamp. In a real application, 
                        you would be able to view the exact frame and see highlighted areas of manipulation.
                      </p>
                    </div>
                  )}
                  
                  {selectedFrame === null && (
                    <div className="text-sm text-muted-foreground">
                      Click on a marker to see details about suspicious frames.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-12 glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold mb-4">Analysis Explanation</h3>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our AI-powered deepfake detection system analyzes various aspects of media to 
                determine authenticity. The analysis is based on multiple factors:
              </p>
              
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Face Manipulation Detection:</strong> Identifies inconsistencies in facial features, 
                  expressions, and movements that may indicate manipulation.
                </li>
                <li>
                  <strong>Background Analysis:</strong> Checks for inconsistencies between the subject and background,
                  which can reveal splicing or compositing.
                </li>
                <li>
                  <strong>Texture Analysis:</strong> Examines pixel-level patterns and artifacts that are often 
                  introduced by AI generation or manipulation.
                </li>
                <li>
                  <strong>Metadata Verification:</strong> Checks file metadata for signs of editing or inconsistencies
                  with the claimed source.
                </li>
                {isVideo && (
                  <li>
                    <strong>Temporal Consistency:</strong> For videos, analyzes consistency across frames to detect
                    manipulation that may only be present in certain segments.
                  </li>
                )}
              </ul>
              
              <p className="italic text-sm">
                Note: This is a demonstration application. In a production environment, the analysis would 
                use sophisticated machine learning models running on powerful backend servers to provide 
                more accurate results.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
