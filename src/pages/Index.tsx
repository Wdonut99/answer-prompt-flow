
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sparkles, Copy, RefreshCw, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const { toast } = useToast();

  const generatePrompt = async () => {
    if (!userQuestion.trim()) {
      toast({
        title: "Please enter a question",
        description: "I need a question to generate a prompt for you.",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your DeepSeek API key to generate prompts.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are an expert prompt engineer. Your task is to take a user's simple question and transform it into a comprehensive, detailed prompt that will get better results from AI assistants.

Guidelines for creating enhanced prompts:
1. Analyze the user's question to understand the context and domain
2. Add relevant role-playing instructions (e.g., "Act as an expert...")
3. Structure the request with clear sections and bullet points
4. Ask for specific deliverables and formats
5. Include relevant considerations like best practices, examples, or step-by-step approaches
6. Make the prompt actionable and comprehensive

Return only the enhanced prompt, nothing else.`
            },
            {
              role: 'user',
              content: `Transform this question into a comprehensive prompt: "${userQuestion}"`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const enhancedPrompt = data.choices[0]?.message?.content || "Failed to generate prompt";
      
      setGeneratedPrompt(enhancedPrompt);
      toast({
        title: "Prompt generated!",
        description: "Your enhanced prompt is ready to use.",
      });
    } catch (error) {
      console.error('Error generating prompt:', error);
      toast({
        title: "Error generating prompt",
        description: "Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied to clipboard!",
      description: "The enhanced prompt has been copied to your clipboard.",
    });
  };

  const clearAll = () => {
    setUserQuestion("");
    setGeneratedPrompt("");
  };

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('deepseek_api_key', apiKey);
      setShowApiKeyInput(false);
      toast({
        title: "API Key saved",
        description: "Your API key has been saved locally.",
      });
    }
  };

  const loadApiKey = () => {
    const savedKey = localStorage.getItem('deepseek_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setShowApiKeyInput(false);
    }
  };

  // Load API key on component mount
  useState(() => {
    loadApiKey();
  });

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">AI Prompt Generator</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Transform your questions into powerful, detailed prompts using DeepSeek AI
          </p>
        </div>

        {/* API Key Section */}
        {showApiKeyInput && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                DeepSeek API Key
              </CardTitle>
              <CardDescription>
                Enter your DeepSeek API key to generate enhanced prompts. Get your API key from{" "}
                <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  DeepSeek Platform
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <Button onClick={saveApiKey} disabled={!apiKey.trim()}>
                Save API Key
              </Button>
            </CardContent>
          </Card>
        )}

        {!showApiKeyInput && (
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setShowApiKeyInput(true)}>
              <Key className="h-4 w-4 mr-2" />
              Change API Key
            </Button>
          </div>
        )}

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Question</CardTitle>
            <CardDescription>
              Enter your question and DeepSeek AI will create an enhanced prompt to get you better results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">What would you like to ask?</Label>
              <Textarea
                id="question"
                placeholder="e.g., How do I create a React component?, Help me write a blog post about AI, Design a mobile app interface..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={generatePrompt} 
                disabled={isGenerating || showApiKeyInput} 
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating with DeepSeek...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Enhanced Prompt
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={clearAll}>
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        {generatedPrompt && (
          <Card>
            <CardHeader>
              <CardTitle>Your Enhanced Prompt</CardTitle>
              <CardDescription>
                Generated by DeepSeek AI - Copy this prompt and use it with any AI assistant for better results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea
                  value={generatedPrompt}
                  readOnly
                  className="min-h-[300px] font-mono text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for Better Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Be specific about what you want to achieve</li>
              <li>• Include relevant context about your skill level or industry</li>
              <li>• Mention any constraints or requirements you have</li>
              <li>• The more detailed your question, the better DeepSeek can enhance it</li>
              <li>• Your API key is stored locally in your browser for convenience</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
