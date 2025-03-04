
import React, { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, Video, X, AlertCircle, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeMedia } from '@/lib/deepfakeDetection';

const UploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ real: number; fake: number } | null>(null);
  
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (uploadedFile: File) => {
    // Check file type
    if (!uploadedFile.type.startsWith('image/') && !uploadedFile.type.startsWith('video/')) {
      toast({
        title: "Unsupported file type",
        description: "Please upload an image or video file.",
        variant: "destructive"
      });
      return;
    }

    // Check file size (limit to 10MB)
    if (uploadedFile.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setFile(uploadedFile);
    setResult(null);
    
    // Create preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result as string);
    };
    fileReader.readAsDataURL(uploadedFile);
    
    // Set file type
    if (uploadedFile.type.startsWith('image/')) {
      setFileType('image');
    } else if (uploadedFile.type.startsWith('video/')) {
      setFileType('video');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setFileType(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    try {
      // In a real app, you would send the file to a backend API
      const analysisResult = await analyzeMedia(file);
      setResult(analysisResult);
      
      toast({
        title: "Analysis complete",
        description: analysisResult.fake > 80 
          ? "This media has a high probability of being AI-generated." 
          : "This media appears to be authentic.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: "We encountered an error while analyzing the media.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="upload" className="section-padding px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upload Media for Analysis</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our advanced AI system will analyze your image or video to detect potential manipulation or synthetic generation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Upload Area */}
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {!file ? (
              <div
                className={`border-2 border-dashed rounded-xl h-80 flex flex-col items-center justify-center p-8 transition-colors duration-300 ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-border/70 hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Drop your file here</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Supports JPG, PNG, and MP4 files up to 10MB
                </p>
                <label className="button-hover cursor-pointer rounded-lg bg-primary text-primary-foreground font-medium px-6 py-3 text-center">
                  Browse Files
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*, video/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            ) : (
              <div className="border rounded-xl overflow-hidden animate-scale-in">
                <div className="relative">
                  {fileType === 'image' && preview && (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-full h-80 object-contain bg-black/5"
                    />
                  )}
                  {fileType === 'video' && preview && (
                    <video 
                      src={preview} 
                      controls 
                      className="w-full h-80 object-contain bg-black/5"
                    />
                  )}
                  <button
                    onClick={handleRemoveFile}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </button>
                </div>
                <div className="p-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      {fileType === 'image' ? (
                        <ImageIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                      ) : (
                        <Video className="w-5 h-5 mr-2 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium truncate max-w-[200px]">
                        {file.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="button-hover w-full rounded-lg bg-primary text-primary-foreground font-medium py-3 text-center disabled:opacity-70"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Area */}
          <div className="glass rounded-xl p-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold mb-6">Analysis Results</h3>
            
            {!file && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">
                  Upload an image or video to see detection results
                </p>
              </div>
            )}
            
            {file && !result && !isAnalyzing && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <AlertCircle className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">
                  Click "Analyze Now" to scan for potential deepfakes
                </p>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 rounded-full border-t-2 border-primary animate-spin mb-4"></div>
                <p className="text-muted-foreground">
                  Analyzing your media...
                </p>
                <div className="w-full max-w-xs mt-6">
                  <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-1 bg-primary w-2/3 rounded-full animate-shimmer bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"></div>
                  </div>
                </div>
              </div>
            )}
            
            {result && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-8 mt-2">
                  <div className="flex items-center">
                    {result.fake > 70 ? (
                      <>
                        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mr-4">
                          <AlertCircle className="w-6 h-6 text-destructive" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">Likely AI-Generated</p>
                          <p className="text-sm text-muted-foreground">High probability of manipulation</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                          <Check className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">Likely Authentic</p>
                          <p className="text-sm text-muted-foreground">Low probability of manipulation</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="text-3xl font-bold">
                    {result.fake > 70 ? (
                      <span className="text-destructive">{result.fake}%</span>
                    ) : (
                      <span className="text-green-500">{result.real}%</span>
                    )}
                  </div>
                </div>
                
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
                
                <div className="mt-10 pt-6 border-t">
                  <h4 className="font-medium mb-2">What does this mean?</h4>
                  <p className="text-sm text-muted-foreground">
                    {result.fake > 70 
                      ? "Our system has detected patterns consistent with AI-generated or manipulated content. The analysis suggests this media has likely been created or altered using deepfake technology."
                      : "Our analysis shows this content displays characteristics consistent with authentic media. While no detection system is perfect, this media appears to be genuine based on our current analysis methods."
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
