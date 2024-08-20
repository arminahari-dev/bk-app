export default function useGetToday(){
    const today = new Date().toISOString().split('T')[0];
    return today;
}