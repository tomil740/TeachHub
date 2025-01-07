import "../style/yourRequestItem.css";
import UserHead from "../UserHead";

function YourRequestItem({ deal }) {
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
          <strong>Seller:</strong> <UserHead userId={deal.sellerUserId} />
        </p>
      </div>
    </div>
  );
}

export default YourRequestItem;
