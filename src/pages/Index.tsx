
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sparkles, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
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

    setIsGenerating(true);
    
    // Simulate AI processing with a realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate an enhanced prompt based on the user's question
    const enhancedPrompt = generateEnhancedPrompt(userQuestion);
    setGeneratedPrompt(enhancedPrompt);
    setIsGenerating(false);

    toast({
      title: "Prompt generated!",
      description: "Your enhanced prompt is ready to use.",
    });
  };

  const generateEnhancedPrompt = (question: string) => {
    // Analyze the question and create a more detailed, structured prompt
    const questionLower = question.toLowerCase();
    
    if (questionLower.includes("code") || questionLower.includes("programming") || questionLower.includes("develop")) {
      return `Act as an expert software developer and technical advisor. 

Original question: "${question}"

Please provide a comprehensive response that includes:
1. A clear, step-by-step solution
2. Best practices and potential pitfalls to avoid
3. Code examples with explanations (if applicable)
4. Alternative approaches or considerations
5. Resources for further learning

Format your response in a structured way with clear headings and examples. Prioritize clarity and practical applicability.`;
    }
    
    if (questionLower.includes("write") || questionLower.includes("content") || questionLower.includes("blog")) {
      return `Act as a professional content writer and communication expert.

Original question: "${question}"

Please help by providing:
1. A detailed outline or structure
2. Key points to cover
3. Target audience considerations
4. Tone and style recommendations
5. SEO considerations (if applicable)
6. Call-to-action suggestions

Ensure the response is actionable and tailored to create engaging, high-quality content.`;
    }
    
    if (questionLower.includes("design") || questionLower.includes("ui") || questionLower.includes("ux")) {
      return `Act as a senior UX/UI designer and design strategist.

Original question: "${question}"

Please provide guidance including:
1. Design principles to consider
2. User experience best practices
3. Visual hierarchy and layout suggestions
4. Accessibility considerations
5. Current design trends and patterns
6. Tools and resources recommendations

Focus on creating user-centered, accessible, and visually appealing solutions.`;
    }
    
    if (questionLower.includes("business") || questionLower.includes("marketing") || questionLower.includes("strategy")) {
      return `Act as a business consultant and strategic advisor with expertise in marketing and operations.

Original question: "${question}"

Please provide strategic insights including:
1. Market analysis and opportunities
2. Risk assessment and mitigation strategies
3. Implementation roadmap
4. Success metrics and KPIs
5. Resource requirements
6. Competitive considerations

Deliver actionable recommendations based on current market trends and proven business practices.`;
    }
    
    // Default enhanced prompt for general questions
    return `Act as a knowledgeable expert in the relevant field for this question.

Original question: "${question}"

Please provide a comprehensive and helpful response that includes:
1. A clear and direct answer to the main question
2. Important context and background information
3. Step-by-step guidance (if applicable)
4. Potential challenges and how to overcome them
5. Additional tips and best practices
6. Relevant examples or case studies

Structure your response clearly with headings and bullet points where appropriate. Prioritize practical, actionable advice that the user can implement immediately.`;
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
            Transform your questions into powerful, detailed prompts for better AI responses
          </p>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Question</CardTitle>
            <CardDescription>
              Enter your question and I'll create an enhanced prompt to get you better results
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
              <Button onClick={generatePrompt} disabled={isGenerating} className="flex-1">
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
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
                Copy this prompt and use it with any AI assistant for better results
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
              <li>• Ask for examples, step-by-step guides, or specific formats</li>
              <li>• The more detailed your question, the better the enhanced prompt will be</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
