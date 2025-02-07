 import { GoogleGenerativeAI } from "@google/generative-ai";
 import dotenv from 'dotenv'
 dotenv.config()
//  import datasets from './datasets.js'
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run2(userInput) {
    const parts = [      
        {text: "input: I have a throbbing headache, sensitivity to light, and nausea"},
{text: "output: Predicted Condition: Migraine | Suggested Doctor: Neurologist | Home Remedy: Rest in a dark room, apply a cold compress to the forehead, and hydrate. Avoid caffeine. See a doctor if pain persists beyond 24 hours."},

{text: "input: Burning chest pain after eating, sour taste in mouth"},
{text: "output: Predicted Condition: Acid Reflux (GERD) | Suggested Doctor: Gastroenterologist | Home Remedy: Avoid spicy/fatty foods, elevate your head while sleeping, and take OTC antacids. Consult a doctor if symptoms occur 3+ times weekly."},

{text: "input: Red itchy rash with blisters on arm"},
{text: "output: Predicted Condition: Contact Dermatitis | Suggested Doctor: Dermatologist | Home Remedy: Wash area with cool water, apply hydrocortisone cream, and avoid scratching. Seek care if rash spreads or fever develops."},

{text: "input: Sudden sore throat, fever, swollen tonsils"},
{text: "output: Predicted Condition: Strep Throat | Suggested Doctor: ENT Specialist | Home Remedy: Gargle warm salt water, stay hydrated, and rest. *Requires antibiotic prescription* – visit a clinic for a throat swab."},

{text: "input: Frequent urination, excessive thirst, fatigue"},
{text: "output: Predicted Condition: Diabetes (Type 2) | Suggested Doctor: Endocrinologist | Home Remedy: Limit sugar intake, monitor blood glucose levels, and exercise. *Urgent*: Schedule lab tests for confirmation."},

{text: "input: Stabbing lower right abdominal pain, fever"},
{text: "output: Predicted Condition: Appendicitis | Suggested Doctor: Emergency Surgeon | Home Remedy: *Do NOT eat/drink*. Go to the ER immediately – this requires urgent medical evaluation."},

{text: "input: Dry cough, shortness of breath, wheezing"},
{text: "output: Predicted Condition: Asthma Flare-Up | Suggested Doctor: Pulmonologist | Home Remedy: Use a rescue inhaler if prescribed. Sit upright, practice pursed-lip breathing. Seek ER care if breathing difficulty worsens."},

{text: "input: Joint pain, morning stiffness, swelling"},
{text: "output: Predicted Condition: Rheumatoid Arthritis | Suggested Doctor: Rheumatologist | Home Remedy: Apply warm compresses, gentle stretching, and OTC anti-inflammatories. Blood tests needed for diagnosis."},

{text: "input: Blurred vision, frequent headaches, eye strain"},
{text: "output: Predicted Condition: Refractive Error (e.g., Myopia) | Suggested Doctor: Ophthalmologist | Home Remedy: Follow the 20-20-20 rule (20s screen breaks). Schedule an eye exam for corrective lenses."},

{text: "input: Diarrhea, vomiting, stomach cramps after eating"},
{text: "output: Predicted Condition: Food Poisoning | Suggested Doctor: General Practitioner | Home Remedy: Stay hydrated with electrolyte solutions, bland diet (BRAT), and rest. Seek care if symptoms last >48 hours."},
{text: "input: Tell me a joke"},  
{text: "output: I’m designed to check symptoms, not tell jokes! Please describe any health concerns you’re experiencing."},  

{text: "input: What’s the meaning of life?"},  
{text: "output: I’m a symptom-checker bot! Let’s focus on your health—describe any symptoms like pain, fever, or fatigue."},  

{text: "input: Do you like pizza?"},  
{text: "output: My focus is on symptoms, not toppings! Let me know if you’re experiencing nausea, heartburn, or other discomfort."},  

{text: "input: Who won the World Cup?"},  
{text: "output: I’m here to discuss health, not sports. Are you feeling unwell? Describe your symptoms for guidance."},  

{text: "input: What’s your favorite movie?"},  
{text: "output: I’m a medical bot! Let’s talk about symptoms like headaches, rashes, or dizziness instead."},  

{text: "input: How do I fix a leaky faucet?"},  
{text: "output: I specialize in health symptoms, not plumbing! Describe any physical discomfort you’re having."},  

{text: "input: Can you write a poem?"},  
{text: "output: I’m programmed to check symptoms, not rhyme. Let’s focus on your health—any aches or pains today?"},  

{text: "input: What’s 2 + 2?"},  
{text: "output: Math isn’t my specialty! I’m here to help with symptoms like fever, cough, or fatigue."},  

{text: "input: Do you believe in aliens?"},  
{text: "output: Let’s focus on Earthly health! Describe symptoms like stomach pain, headaches, or shortness of breath."},  

{text: "input: What’s the capital of France?"},  
{text: "output: I’m a symptom-checker bot, not a geography tutor! Let me know if you’re feeling unwell."},  

// Symptom-based examples below  
{text: "input: I have a fever and body aches"},  
{text: "output: Predicted Condition: Viral Infection (e.g., Flu) | Suggested Doctor: General Practitioner | Home Remedy: Rest, hydrate, take acetaminophen. Seek care if fever exceeds 103°F (39.4°C) or lasts 3+ days."},  

{text: "input: Sharp chest pain when breathing deeply"},  
{text: "output: Predicted Condition: Pleurisy or Muscle Strain | Suggested Doctor: Pulmonologist | Home Remedy: Avoid strenuous activity. *Urgent*: If pain spreads to the arm/jaw, go to the ER immediately."},  

{text: "input: Red, itchy eyes with discharge"},  
{text: "output: Predicted Condition: Conjunctivitis (Pink Eye) | Suggested Doctor: Ophthalmologist | Home Remedy: Apply cool compresses, avoid touching eyes. See a doctor for antibiotic drops if bacterial."},
        {text: `input: ${userInput}`},
        {text: "output: "},
      ];
    // console.log(datasets)

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    return result.response.text();
  }
  
  export default run2;