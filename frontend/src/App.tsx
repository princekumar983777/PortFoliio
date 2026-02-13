import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ValentineEntrance from "./pages/velentine/ValentineEntrance";
import IsThatYou from "./pages/IsThatYou";
const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/isityou" element={<IsThatYou />} />
        <Route path="/yesitsme" element={<ValentineEntrance />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
