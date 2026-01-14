import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaTag,
  FaCommentDots,
} from "react-icons/fa";
import { API_URL } from "../../config";

const InquiriesPanel = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await axios.get(`${API_URL}/inquiries`);
        setInquiries(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading inquiries:", err);
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-emerald-500 font-bold animate-pulse">
        Loading Messages...
      </div>
    );

  if (inquiries.length === 0)
    return (
      <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500">
        No inquiries received yet.
      </div>
    );

  return (
    <div className="grid gap-6">
      {inquiries.map((inq) => (
        <div
          key={inq._id}
          className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg hover:border-emerald-500/30 transition-all"
        >
          {/* TOP ROW: Date & Status */}
          <div className="flex justify-between items-start mb-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg">
                <FaUser />
              </span>
              <div>
                <h3 className="text-white font-bold text-lg">{inq.name}</h3>
                <span className="text-slate-500 text-xs flex items-center gap-1">
                  <FaCalendarAlt /> {new Date(inq.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <span className="text-xs font-bold uppercase bg-slate-800 text-slate-400 px-3 py-1 rounded-full border border-slate-700">
              {inq.status || "New"}
            </span>
          </div>

          {/* MIDDLE: Subject & Message */}
          <div className="mb-6">
            <h4 className="text-emerald-400 text-sm font-bold uppercase mb-2 flex items-center gap-2">
              <FaTag /> {inq.subject}
            </h4>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
              <FaCommentDots className="inline mr-2 text-slate-600" />
              {inq.message}
            </div>
          </div>

          {/* BOTTOM: Contact Actions */}
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${inq.phone}`}
              className="flex items-center gap-2 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
            >
              <FaPhone size={12} /> {inq.phone}
            </a>
            <a
              href={`mailto:${inq.email}`}
              className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
            >
              <FaEnvelope size={12} /> {inq.email}
            </a>
            <a
              href={`https://wa.me/91${inq.phone.replace(/\D/g, "")}`} // Strips non-numbers
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-800 hover:bg-green-500 hover:text-white text-slate-300 px-4 py-2 rounded-lg text-sm font-bold transition-colors ml-auto"
            >
              WhatsApp Reply
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InquiriesPanel;
