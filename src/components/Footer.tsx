
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t py-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">CtrlU</h3>
            <p className="text-muted-foreground">
              Take control of your digital identity and manage consent across applications.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link to="/login" className="text-muted-foreground hover:text-foreground">Sign In</Link></li>
              <li><Link to="/register" className="text-muted-foreground hover:text-foreground">Register</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Developers</h4>
            <ul className="space-y-2">
              <li><Link to="/developer" className="text-muted-foreground hover:text-foreground">Developer Portal</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">API Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Integration Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">SDK & Libraries</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Data Protection</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} CtrlU. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              GitHub
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
