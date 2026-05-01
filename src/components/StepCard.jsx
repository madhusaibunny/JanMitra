import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle2, MapPin, Share2 } from 'lucide-react';

const StepCard = React.memo(({ 
  stepInfo, 
  t, 
  evmVoted, 
  handleEVMVote, 
  handleFindBooth, 
  handleWhatsAppShare, 
  isFindingBooth 
}) => {
  return (
    <div className="step-card" aria-live="polite">
      <h2 className="step-title" style={{ color: stepInfo.color }} tabIndex="0">{stepInfo.title}</h2>
      <p className="step-desc-large" tabIndex="0">{stepInfo.desc}</p>
      
      <div className="action-list" role="list">
        {stepInfo.actions.map((action, i) => (
          <div 
            className="action-item fade-in-action" 
            key={i} 
            role="listitem" 
            tabIndex="0"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <CheckCircle2 className="action-icon" style={{ color: stepInfo.color }} size={32} aria-hidden="true" />
            <span className="action-text-large">{action}</span>
          </div>
        ))}
        
        {stepInfo.showEVM && (
          <div className="evm-simulator fade-in-action" style={{ animationDelay: '0.45s' }}>
            <p className="evm-instructions">{t.evmPracticeText}</p>
            <div className={`evm-machine ${evmVoted ? 'voted' : ''}`}>
              <div className="evm-candidate">👤 Candidate Name</div>
              <div className="evm-symbol">🌻</div>
              <button 
                className="evm-button" 
                onClick={handleEVMVote}
                disabled={evmVoted}
                aria-label="Vote for Candidate"
              ></button>
              <div className={`evm-light ${evmVoted ? 'on' : ''}`}></div>
            </div>
            {evmVoted && <p className="evm-success-text fade-in-action">{t.evmVotedText}</p>}
          </div>
        )}

        {stepInfo.showBoothFinder && (
          <button 
            className="btn-special fade-in-action" 
            onClick={handleFindBooth}
            style={{ animationDelay: '0.45s', backgroundColor: '#059669' }}
            disabled={isFindingBooth}
          >
            <MapPin size={24} /> {isFindingBooth ? "..." : t.findBoothBtn}
          </button>
        )}

        {stepInfo.showShare && (
          <button 
            className="btn-special fade-in-action" 
            onClick={handleWhatsAppShare}
            style={{ animationDelay: '0.45s', backgroundColor: '#25D366', color: 'white' }}
          >
            <Share2 size={24} /> {t.whatsappBtn}
          </button>
        )}
      </div>
    </div>
  );
});

StepCard.propTypes = {
  stepInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    showEVM: PropTypes.bool,
    showBoothFinder: PropTypes.bool,
    showShare: PropTypes.bool,
  }).isRequired,
  t: PropTypes.object.isRequired,
  evmVoted: PropTypes.bool.isRequired,
  handleEVMVote: PropTypes.func.isRequired,
  handleFindBooth: PropTypes.func.isRequired,
  handleWhatsAppShare: PropTypes.func.isRequired,
  isFindingBooth: PropTypes.bool.isRequired,
};

StepCard.displayName = 'StepCard';

export default StepCard;
