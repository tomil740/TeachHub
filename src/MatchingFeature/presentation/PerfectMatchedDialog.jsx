import { useEffect, useState } from "react";
import  usePerfectMatched  from "../domain/usePerfectMatched";
import { useRecoilValue } from "recoil";
import { AuthenticatedUserState } from "../../AuthenticatedUserState";

function PerfectMatchedDialog({userCollection, setCallback,isMatchingView}){
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const loggedUser = useRecoilValue(AuthenticatedUserState)[0];

  const { loading, error, sortedMatches } = usePerfectMatched(
    loggedUser, 
    userCollection,
  );

  useEffect(()=>{
    if(!isMatchingView){
      setIsDialogOpen(false)
    }
  },[isMatchingView])

  useEffect(()=>{
    if(!isDialogOpen){
      setCallback(userCollection);
    }
  },[isDialogOpen])

  

  const handleToggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);

    if (!isDialogOpen && sortedMatches.length > 0) {
      // Pass the sorted matches back to the parent via the callback
      setCallback(sortedMatches);
    }
  };


  return (
    <div className="perfect-matched-dialog">
      <button
        onClick={handleToggleDialog}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        {isDialogOpen ? "Close Perfect Match" : "Find Perfect Match"}
      </button>

      {isDialogOpen && (
        <div className="dialog-content">
          {loading && <div className="loading-spinner">Loading...</div>}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && sortedMatches.length > 0 && (
            <div className="matches-list">
              <h2 className="mb-4 text-center text-lg font-bold">
                Perfect Matches
              </h2>
              <ul className="flex items-end justify-center gap-4">
                {sortedMatches.slice(0, 3).map((match, index) => (
                  <li
                    key={match.id}
                    className={`relative flex flex-col items-center rounded-lg px-4 py-2 text-center shadow-lg ${
                      index === 0
                        ? "scale-110 bg-yellow-400 text-white"
                        : index === 1
                          ? "bg-gray-400 text-white"
                          : "bg-orange-400 text-white"
                    }`}
                    style={{
                      height: `${120 - index * 20}px`,
                      width: `${index === 0 ? 100 : 80}px`,
                    }}
                  >
                    {/* Podium Rank */}
                    <span
                      className={`absolute -top-4 flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold ${
                        index === 0
                          ? "bg-yellow-600"
                          : index === 1
                            ? "bg-gray-600"
                            : "bg-orange-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                    {/* Match Details */}
                    <p className="truncate font-bold">{match.name}</p>
                    <p className="text-sm">Score: {match.score}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!loading && !error && sortedMatches.length === 0 && (
            <div className="no-matches">No matches found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PerfectMatchedDialog;
