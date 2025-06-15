export default function InfoBanner({ infoEvents }) {
  return (
    <View>
      {infoEvents.map((e, i) => (
        <Text key={i} className="text-xs text-gray-500 italic">{e}</Text>
      ))}
    </View>
  );
}
