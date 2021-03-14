function calcRewardForJury(
	juryAcceptAmount,
	juryRejectAmount,
	totalAcceptAmount,
	totalRejectAmount,
	totalRewardForParticipants,
	juryRewardPercent,
) {
	return (juryAcceptAmount + juryRejectAmount) / (totalAcceptAmount + totalRejectAmount) * totalRewardForParticipants * juryRewardPercent / 100
}

export default calcRewardForJury;
