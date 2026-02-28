import { Calculator, Clock, PlayCircle, Sparkles, MessageCircle } from "lucide-react";

interface Product {
  id: string;
  product_name: string;
  sku: string;
  price: number;
  image_url: string | null;
  video_url: string | null;
  coverage_per_sqm: string | null;
  drying_time: string | null;
  application_method: string | null;
  features: string[] | null;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'd like to order:\n\n📦 ${product.product_name}\n🔖 SKU: ${product.sku}\n💰 Price: AED ${product.price.toFixed(2)}\n\nPlease confirm availability.`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <div className="animate-slide-up mt-3 w-full">
      <div className="glass-panel-strong rounded-4xl overflow-hidden shadow-lg">
        {/* Image + Price Badge */}
        {product.image_url && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-1.5 rounded-2xl text-sm font-bold shadow-lg">
              AED {product.price.toFixed(2)}
            </div>
            {product.video_url && (
              <button className="absolute bottom-4 left-4 glass-panel flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-medium text-foreground hover:scale-105 transition-transform">
                <PlayCircle className="w-4 h-4" />
                Watch Video
              </button>
            )}
          </div>
        )}

        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-1">{product.product_name}</h3>
          <p className="text-xs text-muted-foreground mb-4 font-mono">SKU: {product.sku}</p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {product.coverage_per_sqm && (
              <div className="bg-secondary rounded-2xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calculator className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Coverage</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{product.coverage_per_sqm}</p>
              </div>
            )}
            {product.drying_time && (
              <div className="bg-secondary rounded-2xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Drying</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{product.drying_time}</p>
              </div>
            )}
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.features.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-secondary text-muted-foreground text-xs px-2.5 py-1 rounded-xl">
                  <Sparkles className="w-3 h-3 text-accent" />
                  {f}
                </span>
              ))}
            </div>
          )}

          {/* WhatsApp Order */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[hsl(142,70%,40%)] text-[hsl(0,0%,100%)] font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-4 h-4" />
            Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
