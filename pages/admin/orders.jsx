import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import FooterSection from '../../components/FooterSection'
import SeoHead from '../../components/SeoHead'
import PrintLabel from '../../components/PrintLabel'

export default function AdminOrdersPage() {
  const [passcode, setPasscode] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [authError, setAuthError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [copiedId, setCopiedId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [isDeletingAll, setIsDeletingAll] = useState(false)
  const [printLabelOrder, setPrintLabelOrder] = useState(null)
  const [showPrintLabel, setShowPrintLabel] = useState(false)

  // Delete Modals State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    type: 'single', // 'single' | 'all'
    orderId: null,
    orderShortId: '',
  })

  // Toast Notification State
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success', // 'success' | 'error' | 'info' | 'warning'
  })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }))
    }, 3500)
  }

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    setAuthError('')
    if (passcode === 'shelbyadmin123') {
      setIsAuthenticated(true)
      sessionStorage.setItem('shelby_admin_auth', 'true')
      showToast('Authenticated successfully as Admin', 'success')
    } else {
      setAuthError('Incorrect passcode.')
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('shelby_admin_auth') === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return
    setLoading(true)
    fetch('/api/orders')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then((data) => setOrders(data.orders || []))
      .catch((err) => {
        console.error(err)
        setErrorMsg('Unable to load orders.')
        showToast('Unable to load orders from database', 'error')
      })
      .finally(() => setLoading(false))
  }, [isAuthenticated])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch('/api/orders/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      })
      if (!res.ok) throw new Error('Status update failed')
      setOrders((prev) =>
        prev.map((ord) => (ord._id === orderId ? { ...ord, status: newStatus } : ord))
      )
      showToast(`Order status updated to "${newStatus}"`, 'success')
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error')
    }
  }

  // Open Delete Single Order Modal
  const promptDeleteSingle = (order) => {
    setDeleteModal({
      isOpen: true,
      type: 'single',
      orderId: order._id,
      orderShortId: `#ORD-${order._id.slice(-8).toUpperCase()}`,
    })
  }

  // Open Delete All Orders Modal
  const promptDeleteAll = () => {
    if (orders.length === 0) return
    setDeleteModal({
      isOpen: true,
      type: 'all',
      orderId: null,
      orderShortId: '',
    })
  }

  // Execute Deletion
  const confirmDelete = async () => {
    if (deleteModal.type === 'single') {
      const orderId = deleteModal.orderId
      setDeletingId(orderId)
      try {
        const res = await fetch(`/api/orders?id=${orderId}`, {
          method: 'DELETE',
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to delete order')

        setOrders((prev) => prev.filter((o) => o._id !== orderId))
        showToast(`Order ${deleteModal.orderShortId} deleted successfully`, 'success')
      } catch (err) {
        showToast(err.message || 'Error deleting order', 'error')
      } finally {
        setDeletingId(null)
        setDeleteModal({ isOpen: false, type: 'single', orderId: null, orderShortId: '' })
      }
    } else if (deleteModal.type === 'all') {
      setIsDeletingAll(true)
      try {
        const res = await fetch('/api/orders?all=true', {
          method: 'DELETE',
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to delete all orders')

        setOrders([])
        showToast(`All ${data.deletedCount || ''} orders deleted permanently`, 'warning')
      } catch (err) {
        showToast(err.message || 'Error deleting orders', 'error')
      } finally {
        setIsDeletingAll(false)
        setDeleteModal({ isOpen: false, type: 'all', orderId: null, orderShortId: '' })
      }
    }
  }

  const copyToClipboard = (text, id, label = 'Copied') => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    showToast(`${label} copied to clipboard!`, 'info')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('shelby_admin_auth')
  }

  // --- LOGIN PORTAL ---
  if (!isAuthenticated) {
    return (
      <>
        <SeoHead title="Admin Access | Shelby" description="Store management portal." />
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
          <Navbar solid />
          <div className="mx-auto w-full max-w-sm px-4 py-24">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
              <div className="mb-6">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">Admin Login</h1>
                <p className="text-xs text-slate-500 mt-1">Enter your credential key to manage store orders.</p>
              </div>
              {authError && <div className="mb-4 text-xs font-medium text-red-600 bg-red-50 p-3 rounded-md border border-red-100">{authError}</div>}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Security Passcode"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
                />
                <button type="submit" className="w-full rounded-lg bg-slate-900 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-slate-800 transition cursor-pointer">
                  Authenticate
                </button>
              </form>
            </div>
          </div>
          <FooterSection />
        </div>
      </>
    )
  }

  // --- DASHBOARD METRICS & FILTERING ---
  const filteredOrders = orders.filter((o) => {
    const query = searchTerm.toLowerCase()
    const matchesSearch =
      !searchTerm ||
      o.customerDetails?.name?.toLowerCase().includes(query) ||
      o.customerDetails?.phone?.includes(query) ||
      o._id?.toLowerCase().includes(query)
    const matchesStatus = filterStatus === 'ALL' || o.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const pendingCount = orders.filter(o => o.status === 'Pending').length
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)

  return (
    <>
      <SeoHead title="Orders Management | Admin" description="Real-time store management." />
      
      {/* ===================== PRINT LABEL MODAL ===================== */}
      <PrintLabel
        order={printLabelOrder}
        isOpen={showPrintLabel}
        onClose={() => {
          setShowPrintLabel(false)
          setPrintLabelOrder(null)
        }}
      />

      {/* ===================== TOAST NOTIFICATION ===================== */}
      <div className="fixed top-24 right-5 z-50 pointer-events-none transition-all duration-300">
        {toast.show && (
          <div
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-xs font-medium backdrop-blur-md transition-all animate-bounce-short ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-100 border-emerald-700/60 shadow-emerald-900/20'
                : toast.type === 'error'
                ? 'bg-red-950/90 text-red-100 border-red-700/60 shadow-red-900/20'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 text-amber-100 border-amber-700/60 shadow-amber-900/20'
                : 'bg-slate-900/90 text-slate-100 border-slate-700/60 shadow-slate-900/20'
            }`}
          >
            {/* Icon */}
            {toast.type === 'success' && (
              <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {toast.type === 'error' && (
              <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            {toast.type === 'warning' && (
              <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            )}
            {toast.type === 'info' && (
              <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}

            <span>{toast.message}</span>

            <button
              onClick={() => setToast((prev) => ({ ...prev, show: false }))}
              className="ml-2 text-white/50 hover:text-white transition p-0.5"
            >
              Ã¢Å“â€¢
            </button>
          </div>
        )}
      </div>

      {/* ===================== DELETE CONFIRMATION MODAL ===================== */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {deleteModal.type === 'all' ? 'Delete All Orders?' : `Delete Order ${deleteModal.orderShortId}?`}
                </h3>
                <span className="text-xs text-red-500 font-medium">Permanent Action</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed my-4">
              {deleteModal.type === 'all' ? (
                <>
                  Are you sure you want to permanently delete <strong>ALL ({orders.length})</strong> orders from the database? All customer data and transaction records will be wiped.
                </>
              ) : (
                <>
                  Are you sure you want to delete order <strong>{deleteModal.orderShortId}</strong>? This cannot be undone.
                </>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteModal({ isOpen: false, type: 'single', orderId: null, orderShortId: '' })}
                disabled={deletingId || isDeletingAll}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingId || isDeletingAll}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition flex items-center gap-2"
              >
                {deletingId || isDeletingAll ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>{deleteModal.type === 'all' ? `Yes, Delete All (${orders.length})` : 'Yes, Delete Order'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== DASHBOARD MAIN BODY ===================== */}
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
        <Navbar solid />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Orders Overview</h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage customer fulfillment and payment statuses.</p>
            </div>
            
            <div className="flex items-center gap-2.5">
              {/* Delete All Orders Button */}
              {orders.length > 0 && (
                <button
                  onClick={promptDeleteAll}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition cursor-pointer shadow-2xs"
                  title="Delete all orders at once"
                >
                  <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete All ({orders.length})</span>
                </button>
              )}

              <button onClick={handleLogout} className="px-3.5 py-1.5 text-xs font-medium border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-slate-700 transition cursor-pointer shadow-2xs">
                Sign Out
              </button>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium">Total Orders</span>
              <p className="text-xl font-bold text-slate-900 mt-1">{orders.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium">Action Required</span>
              <p className="text-xl font-bold text-amber-600 mt-1">{pendingCount} Pending</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium">Completed</span>
              <p className="text-xl font-bold text-emerald-600 mt-1">{orders.filter(o => o.status === 'Completed').length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium">Total Revenue</span>
              <p className="text-xl font-bold text-slate-900 mt-1">Rs. {totalRevenue.toLocaleString()}</p>
            </div>
          </div>

          {/* Search & Status Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search orders by customer, phone, or ID..."
                className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-4 py-2 text-xs focus:border-slate-800 focus:outline-none"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-lg">
              {['ALL', 'Pending', 'Shipped', 'Completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${
                    filterStatus === status ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Stream */}
          {loading ? (
            <div className="text-center py-20 text-xs text-slate-400">Loading live data...</div>
          ) : errorMsg ? (
            <div className="p-4 bg-red-50 text-red-600 text-xs rounded-md border border-red-100">{errorMsg}</div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white text-center py-16 rounded-xl border border-slate-200 text-xs text-slate-500">
              No matching orders found.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const shortId = `#ORD-${order._id.slice(-8).toUpperCase()}`
                return (
                  <div key={order._id} className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                    
                    {/* Order Top Bar */}
                    <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-900">{shortId}</span>
                        <button
                          onClick={() => copyToClipboard(order._id, order._id, 'Raw Order ID')}
                          className="text-slate-400 hover:text-slate-700 font-sans text-[11px] underline cursor-pointer"
                        >
                          {copiedId === order._id ? 'Copied Full ID' : 'Copy Raw ID'}
                        </button>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-500">{new Date(order.createdAt).toLocaleString()}</span>
                      </div>

                      {/* Status Selector & Delete Action */}
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-md border cursor-pointer focus:outline-none ${
                            order.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : order.status === 'Shipped'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <button
                          onClick={() => {
                            setPrintLabelOrder(order)
                            setShowPrintLabel(true)
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition cursor-pointer"
                          title="Print Shipping Label"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4H9a2 2 0 01-2-2v-4a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2m-6 4h6"
                            />
                          </svg>
                          <span>Print Label</span>
                        </button>

                        <button
                          onClick={() => promptDeleteSingle(order)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 transition cursor-pointer"
                          title="Delete Order"
                        >
                          <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Body */}
                    <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                      
                      {/* Products */}
                      <div className="md:col-span-1 space-y-3">
                        <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] text-slate-400">
                          Items Ordered ({order.items.length})
                        </h4>
                        <div className="divide-y divide-slate-100">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-2 flex justify-between items-start gap-2">
                              <div>
                                <p className="font-medium text-slate-800">{item.name}</p>
                                {item.variant?.name && <p className="flex items-center gap-1.5 text-[#be315b] text-[11px]"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.variant.value }} />Shade: {item.variant.name} ({item.variant.value})</p>}
                                <p className="text-slate-400 text-[11px]">Qty: {item.quantity} Ãƒâ€” Rs. {item.price}</p>
                              </div>
                              <span className="font-semibold text-slate-900">Rs. {item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 pt-4 md:pt-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] text-slate-400">
                            Customer Details
                          </h4>
                          <button
                            onClick={() => copyToClipboard(`${order.customerDetails.name}, ${order.customerDetails.phone}, ${order.customerDetails.address}`, `addr-${order._id}`, 'Customer Address')}
                            className="text-[11px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
                          >
                            {copiedId === `addr-${order._id}` ? 'Address Copied!' : 'Copy Address'}
                          </button>
                        </div>
                        <p className="font-bold text-slate-900 text-sm">{order.customerDetails.name}</p>
                        <p className="text-slate-600">{order.customerDetails.phone}</p>
                        <p className="text-slate-500 break-all">{order.customerDetails.email}</p>
                        <p className="text-slate-700 leading-relaxed pt-1">{order.customerDetails.address}, {order.customerDetails.city}</p>
                      </div>

                      {/* Financials */}
                      <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 pt-4 md:pt-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] text-slate-400 mb-2">
                            Payment Details
                          </h4>
                          <div className="inline-block bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded text-[11px] mb-3">
                            {order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : (order.paymentMethod || 'Online Payment')}
                          </div>
                          
                          <div className="space-y-1.5 pt-2 text-slate-600">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span>Rs. {order.subtotal}</span>
                            </div>
                            {order.discount > 0 && (
                              <div className="flex justify-between text-emerald-600 font-medium">
                                <span>5% Online Discount</span>
                                <span>- Rs. {order.discount}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span>Shipping</span>
                              <span>Rs. {order.shippingFee}</span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline font-bold text-slate-900">
                          <span className="text-sm">Total Paid/Due</span>
                          <span className="text-base text-slate-900">Rs. {order.total}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
        <FooterSection />
      </div>
    </>
  )
}




