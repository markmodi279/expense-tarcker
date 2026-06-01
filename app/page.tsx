import { authOptions } from '@/auth';
import ExpenseForm from '@/features/expenses/components/ExpenseForm';
import ExpenseList from '@/features/expenses/components/ExpenseList'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  return (
    <main className='min-h-screen bg-gray-100 py-10 px-4'>
      <div className='max-w-md mx-auto mb-6'>
        {/* page title */}
        <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Expense Tracker</h1>
        <p className='text-sm text-gray-500 mt-1'>Manage your personal budget and daily spending.</p>
      </div>

      {/* ExpenseForm Component */}
      <ExpenseForm />

      {/* ExpenseList Component */}
      <ExpenseList />
    </main>
  )
}

export default HomePage;
