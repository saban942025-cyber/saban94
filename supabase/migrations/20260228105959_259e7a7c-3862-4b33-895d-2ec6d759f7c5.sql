
-- Create inventory table for construction supply products
CREATE TABLE public.inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  price NUMERIC(10,2) NOT NULL,
  image_url TEXT,
  video_url TEXT,
  coverage_per_sqm TEXT,
  drying_time TEXT,
  application_method TEXT,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Public read access (products are public)
CREATE POLICY "Anyone can view inventory" ON public.inventory FOR SELECT USING (true);

-- Insert sample construction supply data
INSERT INTO public.inventory (product_name, sku, price, image_url, coverage_per_sqm, drying_time, application_method, features) VALUES
('Jotun Jotashield Extreme', 'JOT-EXT-001', 285.00, 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400', '8-10 m²/L', '4-6 hours', 'Brush / Roller / Spray', ARRAY['Weather resistant', 'Anti-algae', 'UV protection', '15-year warranty']),
('Weber Floor Leveler Pro', 'WEB-FLP-002', 145.00, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400', '1.5 kg/m²/mm', '24 hours', 'Pour & Spread', ARRAY['Self-leveling', 'High compressive strength', 'Interior/Exterior', 'Pump applicable']),
('Sika Waterproofing Membrane', 'SIK-WPM-003', 520.00, 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400', '1.5-2.0 kg/m²', '12 hours', 'Brush / Trowel', ARRAY['Crack-bridging', 'Chemical resistant', 'Root resistant', 'CE certified']),
('Mapei Keraflex Tile Adhesive', 'MAP-KTA-004', 78.00, 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400', '3-5 kg/m²', '24 hours', 'Notched Trowel', ARRAY['C2TE class', 'Flexible', 'Non-slip', 'For large format tiles']),
('Dulux Weathershield Max', 'DLX-WSM-005', 195.00, 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400', '10-12 m²/L', '2-4 hours', 'Brush / Roller', ARRAY['All-weather protection', 'Anti-chalking', 'Dirt resistant', '10-year color warranty']),
('BASF MasterSeal 501', 'BSF-MS5-006', 340.00, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400', '2.0 kg/m²', '6-8 hours', 'Brush / Spray', ARRAY['Cementitious coating', 'Potable water approved', 'Negative pressure resistant', 'Easy application']);
