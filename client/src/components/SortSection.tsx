import Button from "../props/Button";
const metrics = [
    "Name",
    "Stars",
    "Forks",
    "Open Issues",
    "Watchers",
    "Updated At",
    "Created At"
];
interface SortSectionProps {
    sortType: string;
    selectedButton: string | null;
    onClick: (value: string) => void;
}

const SortSection: React.FC<SortSectionProps> = ({ sortType, selectedButton, onClick}) => {
    return <>
        <h2 className='m-2 text-xl font-semibold'>Sort By:</h2>
        <div className='flex place-items-center align-self-center'>
        {
          metrics.map(metric => <Button value={metric} onClick={() => onClick(metric)} sortType={sortType} selectedButton={selectedButton} />)
        }
      </div>
    </>
} 

export default SortSection;