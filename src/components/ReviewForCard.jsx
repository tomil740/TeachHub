
import { collection, getDocs} from 'firebase/firestore';
import { db } from "../firebase"
import { useState, useEffect } from 'react';
const ReviewForCard=({userId})=>{
    const [feedbackData, setFeedbackData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchFeedback=async ()=>{
            try{
                const feedback=collection(db,"Feedback", userId, "comment")
                const feedbackSnapshot = await getDocs(feedback);
                setLoading(false);
                if (!feedbackSnapshot.empty) {
                    const feedbackData = feedbackSnapshot.docs.map(doc => doc.data());
                    setFeedbackData(feedbackData) ;
                    console.log(feedbackData)
                }
                else{
                    console.log('No feedback found for this profile');
                }
            }catch(error){
                console.error('Error fetching profile feedback:', error);
                setFeedbackData([]) ;
                setLoading(false);
            }
        }
        fetchFeedback()
    },[userId])
    if (loading) return <div>Loading...</div>;
    return(
        <div>
            {feedbackData.length > 0 ? (
        feedbackData.map((feedback, index) => (
          <div key={index}>
            <p>{feedback.text}</p>
          </div>
        ))
      ) : (
        <p>No feedback available.</p>
      )}
        </div>
    )
}
export default ReviewForCard