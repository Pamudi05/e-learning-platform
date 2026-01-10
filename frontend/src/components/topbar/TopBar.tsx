interface TopBarProps {
  title: string;
};

const TopBar = ({ title }: TopBarProps) => {
  return (
    <div className="top-bar">
      <p style={{fontSize: '15px', fontWeight: '500'}}>{title}</p>
    </div>
  );
};

export default TopBar;
