import "../style/yourRequestItem.css"; 
import UserHeader from "../userHeader";

function YourRequestItem({ deal}) {
  return (
    <div className="your-request-item">
      <div className="request-header">
        <h3>Your Request</h3>
        <p>
          Status: {deal.isPending ? "Awaiting Seller's Response" : "Accepted"}
        </p>
      </div>
      <div className="request-details">
        <p>
          <strong>Price:</strong> {deal.dealPrice} coins
        </p>
        <p>
          <strong>Seller:</strong> <UserHeader userId={deal.sellerUserId} />
        </p>
      </div>
    </div>
  );
}

export default YourRequestItem;
