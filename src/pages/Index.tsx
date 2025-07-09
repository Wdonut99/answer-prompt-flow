
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

  const enhancePrompt = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Detect the type of question and apply appropriate enhancement
    if (lowerQuestion.includes('code') || lowerQuestion.includes('program') || lowerQuestion.includes('function') || lowerQuestion.includes('app') || lowerQuestion.includes('website')) {
      return `**Act as an expert software developer and coding mentor.**

**User Request:** ${question}

**Enhanced Prompt:**

Please help me with the following coding task with these specifications:

**Context & Requirements:**
• Analyze the request and identify the programming language, framework, or technology stack most suitable
• Consider best practices, performance, and maintainability
• Provide clean, well-documented code

**Deliverables:**
• Step-by-step explanation of the approach
• Complete, working code solution
• Comments explaining key logic and decisions
• Any necessary setup instructions or dependencies
• Error handling considerations where applicable

**Additional Considerations:**
• Follow industry-standard naming conventions
• Include relevant examples or use cases
• Suggest testing approaches if applicable
• Mention any potential security considerations
• Provide optimization tips if relevant

Please structure your response clearly with sections for explanation, code, and any additional notes.`;
    }
    
    if (lowerQuestion.includes('write') || lowerQuestion.includes('blog') || lowerQuestion.includes('article') || lowerQuestion.includes('story') || lowerQuestion.includes('content')) {
      return `**Act as an expert content writer and storytelling specialist.**

**User Request:** ${question}

**Enhanced Writing Prompt:**

Please create compelling content based on the following detailed specifications:

**Content Strategy:**
• Identify the target audience and their needs
• Determine the appropriate tone, style, and voice
• Consider the purpose and desired outcome of the content

**Structure & Format:**
• Create an engaging introduction that hooks the reader
• Develop clear, logical flow with smooth transitions
• Include relevant examples, anecdotes, or case studies
• Craft a compelling conclusion with clear takeaways

**Quality Standards:**
• Ensure content is original, engaging, and valuable
• Use active voice and varied sentence structure
• Include relevant keywords naturally (if applicable)
• Fact-check and cite sources where necessary

**Deliverables:**
• Well-structured, polished content
• Suggested headlines or titles
• Key points summary
• Any relevant formatting suggestions (headers, bullet points, etc.)

Please provide content that is both informative and engaging, tailored to the specified audience and purpose.`;
    }
    
    if (lowerQuestion.includes('design') || lowerQuestion.includes('ui') || lowerQuestion.includes('ux') || lowerQuestion.includes('interface') || lowerQuestion.includes('layout')) {
      return `**Act as an expert UX/UI designer and design strategist.**

**User Request:** ${question}

**Enhanced Design Prompt:**

Please provide comprehensive design guidance based on these detailed requirements:

**Design Research & Strategy:**
• Analyze user needs, goals, and pain points
• Consider the target audience and their context of use
• Research current design trends and best practices
• Define success metrics and design objectives

**Design Specifications:**
• Create detailed wireframes or mockups as needed
• Specify color schemes, typography, and visual hierarchy
• Design for accessibility and inclusive user experience
• Consider responsive design across different devices

**User Experience Considerations:**
• Map out user journey and interaction flows
• Identify potential usability issues and solutions
• Design intuitive navigation and information architecture
• Plan for different user scenarios and edge cases

**Deliverables:**
• Detailed design rationale and decision explanations
• Visual design recommendations or mockups
• Interactive elements and micro-interaction suggestions
• Implementation guidelines for developers
• Testing and iteration recommendations

Please provide practical, user-centered design solutions that balance aesthetics with functionality.`;
    }
    
    if (lowerQuestion.includes('business') || lowerQuestion.includes('strategy') || lowerQuestion.includes('marketing') || lowerQuestion.includes('plan') || lowerQuestion.includes('analysis')) {
      return `**Act as an expert business consultant and strategic advisor.**

**User Request:** ${question}

**Enhanced Business Prompt:**

Please provide comprehensive business guidance addressing the following strategic elements:

**Situation Analysis:**
• Analyze the current market conditions and competitive landscape
• Identify key opportunities, threats, and challenges
• Assess available resources and constraints
• Define success criteria and measurable objectives

**Strategic Framework:**
• Develop actionable strategies aligned with business goals
• Consider short-term tactics and long-term vision
• Identify key stakeholders and their interests
• Plan resource allocation and timeline considerations

**Implementation Approach:**
• Break down strategies into specific, actionable steps
• Identify potential risks and mitigation strategies
• Suggest metrics for tracking progress and success
• Consider change management and organizational impact

**Deliverables:**
• Clear, actionable recommendations
• Step-by-step implementation roadmap
• Risk assessment and contingency planning
• Success metrics and KPI suggestions
• Resource requirements and budget considerations

Please provide practical, data-driven business solutions that are realistic and implementable.`;
    }
    
    // Generic enhancement for other types of questions
    return `**Act as an expert advisor and problem-solving specialist.**

**User Request:** ${question}

**Enhanced Comprehensive Prompt:**

Please provide thorough assistance with this request using the following structured approach:

**Understanding & Analysis:**
• Break down the request into key components
• Identify the main objectives and desired outcomes
• Consider different perspectives and approaches
• Analyze any constraints or requirements

**Research & Context:**
• Provide relevant background information
• Include current best practices and industry standards
• Reference credible sources and expert opinions
• Consider recent developments or trends in the field

**Solution Development:**
• Present multiple approaches or solutions where applicable
• Explain the reasoning behind each recommendation
• Include step-by-step implementation guidance
• Address potential challenges and how to overcome them

**Deliverables:**
• Clear, actionable recommendations
• Detailed explanations and rationale
• Practical examples and use cases
• Next steps and follow-up considerations
• Additional resources for further learning

Please provide comprehensive, well-researched, and practical guidance that directly addresses the request with actionable insights.`;
  };

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
    
    // Simulate API delay for better UX
    setTimeout(() => {
      const enhancedPrompt = enhancePrompt(userQuestion);
      setGeneratedPrompt(enhancedPrompt);
      setIsGenerating(false);
      
      toast({
        title: "Prompt generated!",
        description: "Your enhanced prompt is ready to use.",
      });
    }, 1500);
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
            Transform your questions into powerful, detailed prompts instantly
          </p>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Question</CardTitle>
            <CardDescription>
              Enter your question and I'll create an enhanced prompt to get you better results from any AI assistant
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
                disabled={isGenerating} 
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating Enhanced Prompt...
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
                Copy this enhanced prompt and use it with any AI assistant for better, more detailed results
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
              <li>• The more detailed your question, the better the enhanced prompt will be</li>
              <li>• Works offline - no API keys or internet connection required!</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
