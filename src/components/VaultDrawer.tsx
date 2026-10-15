import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, CheckCircle2, PackageCheck } from 'lucide-react';
import { Fragrance } from '../data/fragrances';

export interface VaultItem {
  id: string;
  fragrance: Fragrance;
  size: string;
  unitPrice: number;
  quantity: number;
  monogram?: string;
}

interface VaultDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: VaultItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearVault: () => void;
}

export const VaultDrawer: React.FC<VaultDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearVault
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [clientPostal, setClientPostal] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const whiteGloveShipping = subtotal > 500 ? 0 : 45;
  const grandTotal = subtotal + whiteGloveShipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  const resetAll = () => {
    setOrderConfirmed(false);
    setIsCheckingOut(false);
    onClearVault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#0B0B0C]/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#141314] border-l border-[#85817C]/25 text-[#E5E2E3] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-[#85817C]/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6AD85] block">
                Acquisition Registry
              </span>
              <h2 className="font-serif text-2xl text-[#F1ECE4]">
                Private Flacon Vault
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#85817C] hover:text-[#F1ECE4] transition-colors cursor-pointer"
              aria-label="Close vault drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {orderConfirmed ? (
              /* Order Confirmation State */
              <div className="py-8 space-y-6 text-center">
                <div className="w-16 h-16 mx-auto bg-[#1B1A1A] border border-[#C6AD85] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#C6AD85]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#C6AD85]">
                    Order Confirmed · Dossier #NE-{Math.floor(1000 + Math.random() * 9000)}
                  </span>
                  <h3 className="font-serif text-3xl text-[#F1ECE4]">
                    Prepared for Maceration
                  </h3>
                  <p className="font-sans text-xs text-[#CBC6C0] leading-relaxed max-w-xs mx-auto">
                    Thank you, {clientName || 'Connoisseur'}. Your numbered flacon certificates are being sealed with black wax at our Grasse atelier.
                  </p>
                </div>

                <div className="p-4 bg-[#1B1A1A] border border-[#85817C]/20 text-left space-y-2 text-xs font-sans">
                  <p className="text-[#85817C] uppercase tracking-wider text-[10px]">Delivery Protocol:</p>
                  <p className="text-[#F1ECE4] font-medium">Temperature-controlled white-glove courier</p>
                  <p className="text-[#85817C]">{clientAddress}, {clientCity} {clientPostal}</p>
                </div>

                <button
                  onClick={resetAll}
                  className="w-full py-3.5 bg-[#C6AD85] text-[#0B0B0C] font-sans font-medium text-xs tracking-[0.2em] uppercase cursor-pointer"
                >
                  Return to Salon
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form using Design System Text Input Spec */
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#85817C]/20 pb-3">
                  <h3 className="font-serif text-xl text-[#F1ECE4]">
                    Recipient & Delivery Registry
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-[#C6AD85] uppercase tracking-wider underline cursor-pointer"
                  >
                    Edit Vault Items
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-[0.18em] text-[#85817C] block">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Adrienne de Montfort"
                      className="w-full bg-transparent border-0 border-b border-[#85817C] focus:border-[#C6AD85] text-[#F1ECE4] font-serif text-base py-2 focus:outline-none placeholder:text-[#85817C]/40 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-[0.18em] text-[#85817C] block">
                      Confidential Email (for Certificate & Courier Dispatch)
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@salondeparfum.fr"
                      className="w-full bg-transparent border-0 border-b border-[#85817C] focus:border-[#C6AD85] text-[#F1ECE4] font-serif text-base py-2 focus:outline-none placeholder:text-[#85817C]/40 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-[0.18em] text-[#85817C] block">
                      Private Residence or Sanctuary Address
                    </label>
                    <input
                      type="text"
                      required
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      placeholder="28 Rue de la Paix"
                      className="w-full bg-transparent border-0 border-b border-[#85817C] focus:border-[#C6AD85] text-[#F1ECE4] font-serif text-base py-2 focus:outline-none placeholder:text-[#85817C]/40 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-[0.18em] text-[#85817C] block">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={clientCity}
                        onChange={(e) => setClientCity(e.target.value)}
                        placeholder="Paris"
                        className="w-full bg-transparent border-0 border-b border-[#85817C] focus:border-[#C6AD85] text-[#F1ECE4] font-serif text-base py-2 focus:outline-none placeholder:text-[#85817C]/40 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-[0.18em] text-[#85817C] block">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={clientPostal}
                        onChange={(e) => setClientPostal(e.target.value)}
                        placeholder="75002"
                        className="w-full bg-transparent border-0 border-b border-[#85817C] focus:border-[#C6AD85] text-[#F1ECE4] font-serif text-base py-2 focus:outline-none placeholder:text-[#85817C]/40 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#1B1A1A] border border-[#85817C]/20 text-xs space-y-2 text-[#CBC6C0]">
                  <div className="flex justify-between">
                    <span>Payment Term:</span>
                    <span className="text-[#C6AD85] font-medium">Bespoke Invoicing Upon Dispatch</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificate:</span>
                    <span className="text-[#F1ECE4]">Signed by Master Perfumer</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C6AD85] hover:bg-[#D8C4A5] text-[#0B0B0C] font-sans font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <PackageCheck className="w-4 h-4" />
                  <span>Confirm Acquisition (${grandTotal} USD)</span>
                </button>
              </form>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <p className="font-serif text-2xl text-[#85817C]">
                  The Vault is Silent
                </p>
                <p className="font-sans text-xs text-[#85817C] max-w-xs mx-auto">
                  No flacons have been acquired. Explore our chiaroscuro extrait collection or formulate a bespoke elixir.
                </p>
              </div>
            ) : (
              /* Itemized Cart List */
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-[#1B1A1A] border border-[#85817C]/20 flex gap-4 items-center"
                  >
                    <img
                      src={item.fragrance.image}
                      alt={item.fragrance.name}
                      className="w-16 h-16 object-cover bg-[#0B0B0C] border border-[#85817C]/20 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-lg text-[#F1ECE4] truncate">
                        {item.fragrance.name}
                      </h4>
                      <p className="text-[11px] text-[#85817C] uppercase tracking-wider font-sans">
                        {item.size} · {item.fragrance.concentration.split(' ')[0]}
                      </p>
                      {item.monogram && (
                        <p className="text-[10px] text-[#C6AD85] font-mono mt-0.5">
                          CAP ENGRAVING: [{item.monogram}]
                        </p>
                      )}
                      <p className="font-mono tabular-nums text-sm text-[#F1ECE4] mt-1">
                        ${item.unitPrice * item.quantity} USD
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center border border-[#85817C]/30 bg-[#141314]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-[#85817C] hover:text-[#F1ECE4]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono tabular-nums text-[#F1ECE4]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-[#85817C] hover:text-[#F1ECE4]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#85817C] hover:text-[#ffb4ab] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Footer / Summary Strip */}
          {items.length > 0 && !orderConfirmed && !isCheckingOut && (
            <div className="p-6 border-t border-[#85817C]/20 bg-[#1B1A1A] space-y-4">
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-[#85817C]">
                  <span>Subtotal:</span>
                  <span className="font-mono tabular-nums text-[#F1ECE4]">${subtotal} USD</span>
                </div>
                <div className="flex justify-between text-[#85817C]">
                  <span>White Glove Courier:</span>
                  <span className="font-mono tabular-nums text-[#F1ECE4]">
                    {whiteGloveShipping === 0 ? 'Complimentary' : `$${whiteGloveShipping} USD`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#85817C]/20 text-sm font-normal text-[#F1ECE4]">
                  <span>Grand Total:</span>
                  <span className="font-mono tabular-nums text-lg text-[#C6AD85]">
                    ${grandTotal} USD
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-4 bg-[#C6AD85] hover:bg-[#D8C4A5] text-[#0B0B0C] font-sans font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Proceed to Client Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#85817C] uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-[#C6AD85]" />
                <span>Complimentary courier over $500</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
