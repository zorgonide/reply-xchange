import FileUploadCard from '../../Components/FileUploadCard/FileUploadCard';

function HomePage() {
    return (
        <div className='flex justify-center items-center h-screen'>
        <div className='bg-gray-200 p-4'>
            <FileUploadCard />
        </div>
        </div>
    );
  }
  
  export default HomePage;